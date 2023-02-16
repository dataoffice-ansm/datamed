import { Combobox } from '@headlessui/react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import type { ChangeEvent, HTMLAttributes } from 'react';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { entityTypeLabel } from '../utils/entities';
import type { Entity, EntityCis, EntitySub } from '../contexts/EntityContext';
import {
  useSpecialitiesQuery,
  useSubstancesQuery,
} from '../graphql/__generated__/generated-documents';
import { useBreakpoint } from '../hooks/useTailwindBreakpoint';
import { LoaderSpinner } from './LoadingSpinner';
import SearchIcon from '../assets/nav/search.svg';
import { lookUpSearch } from '../utils/autocomplete';

/**
 *
 * @param embedded
 * @param autoFocus
 * @param handleOnSelected
 * @constructor
 */
export const AutocompleteSearch = ({
  embedded,
  autoFocus,
  handleOnSelected,
}: HTMLAttributes<HTMLDivElement> & {
  embedded?: boolean;
  autoFocus?: boolean;
  handleOnSelected?: () => void;
}) => {
  const isLargeDesktop = useBreakpoint('lg');
  const { data: cisData, loading: cisLoading } = useSpecialitiesQuery();
  const { data: subData, loading: subLoading } = useSubstancesQuery();

  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Entity[]>([]);

  useEffect(() => {
    const formattedQuery = query.toLowerCase();
    if (cisData?.getSpecialities && subData?.getSubstances) {
      const specialities = cisData.getSpecialities?.specialities;
      const { substances } = subData.getSubstances;

      const filteredCis = specialities
        ? (specialities
            .filter((cis) => cis !== null)
            .filter((cis) => lookUpSearch(cis?.name ?? '', formattedQuery))
            .slice(0, 50)
            .map((row) => ({ type: 'cis', ...row, code: row?.code ?? '' })) as EntityCis[])
        : [];

      const filteredSub = substances
        ? (substances
            .filter((sub) => sub !== null)
            .filter((sub) => lookUpSearch(sub?.name ?? '', formattedQuery))
            .slice(0, 50)
            .map((row) => ({ type: 'sub', ...row, code: row?.code ?? '' })) as EntitySub[])
        : [];

      setResults([...filteredCis, ...filteredSub]);
    }
  }, [query, cisData?.getSpecialities, subData?.getSubstances]);

  const onSelected = async (e: Entity) => {
    const url = e.type === 'sub' ? `/substance/${e.code}` : `/specialite/${e.code}`;
    if (handleOnSelected) handleOnSelected();
    await router.push(url);
  };

  const debounceInputOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, 200);

  const renderOptions = useCallback(
    () => (
      <Combobox.Options
        className={classnames(
          'AutocompleteOptions bg-white z-[1] border-t border-grey-100 px-0',
          embedded
            ? 'm-0'
            : 'rounded-lg absolute max-h-80 overflow-auto border mt-1 top-[48px] left-0 right-0'
        )}
      >
        {results.length === 0 && (
          <div className={classnames('text-grey-400 py-2 px-4')}>Aucun résultat disponible</div>
        )}
        {results.length > 0 && (
          <div>
            {results.map((result) => (
              <Combobox.Option
                key={`${result.type}__${result.id}`}
                value={result}
                className={({ active }) =>
                  classnames(
                    'AutocompleteOption cursor-pointer list-none border-b last:border-none border-grey-400',
                    'flex items-center justify-between gap-4 hover:bg-grey-100 text-md py-2 px-2 ',
                    {
                      'bg-grey-100': active,
                      'first:rounded-t-lg last:rounded-b-lg': !embedded,
                    }
                  )
                }
              >
                <div>{result?.name}</div>
                <div className="text-grey-400 text-sm">{entityTypeLabel(result?.type)}</div>
              </Combobox.Option>
            ))}
          </div>
        )}
      </Combobox.Options>
    ),
    [embedded, results]
  );

  const isLoading = cisLoading || subLoading;
  const loadingPlaceholder = isLargeDesktop ? 'Chargement des données' : 'Chargement';
  const placeholder = isLargeDesktop
    ? 'Rechercher un médicament, une substance active'
    : 'Rechercher';

  return (
    <div
      className={classnames(
        'AutocompleteContainer bg-white min-w-[10rem] max-w-2xl',
        embedded
          ? 'embedded px-2 py-1 border-grey-100 rounded-none sticky top-0 shadow-lg flex flex-col'
          : 'rounded-lg border border-grey-400 py-1 px-2 top-[48px] left-0 right-0'
      )}
    >
      <Combobox onChange={onSelected}>
        <div className="relative">
          <div className="relative flex items-center w-full overflow-hidden sm:text-sm">
            <Combobox.Input
              autoFocus={autoFocus}
              placeholder={cisLoading || subLoading ? loadingPlaceholder : placeholder}
              disabled={cisLoading || subLoading}
              className="AutocompleteInput flex-1 border-none !px-0"
              value={query}
              onChange={debounceInputOnChange}
            />
            <div className="afterElement w-8">
              {(isLoading && <LoaderSpinner />) ||
                (!embedded && (
                  <div className="pointer-events-none">
                    <SearchIcon className="w-8 h-8" alt="search" />
                  </div>
                ))}
            </div>
          </div>
          {query.length >= 3 && renderOptions()}
        </div>
      </Combobox>
    </div>
  );
};
