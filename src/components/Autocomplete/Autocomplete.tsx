import { Combobox } from '@headlessui/react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import type { ChangeEvent, HTMLAttributes } from 'react';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { entityTypeLabel } from '../../helpers/entitiesHelper';
import type { Entity, EntityCis, EntitySub } from '../../contexts/EntityContext';
import {
  useSpecialitiesQuery,
  useSubstancesQuery,
} from '../../graphql/__generated__/generated-documents';
import { useBreakpoint } from '../../hooks/useTailwindBreakpoint';
import { LoaderSpinner } from '../LoadingSpinner';
import SearchIcon from '../../icons/search.svg';
import { navIconSize } from '../../config/config';

/**
 *
 * @param embedded
 * @param handleOnSelected
 * @constructor
 */
export const Autocomplete = ({
  embedded,
  handleOnSelected,
}: HTMLAttributes<HTMLDivElement> & { embedded?: boolean; handleOnSelected?: () => void }) => {
  const isLargeDesktop = useBreakpoint('lg');
  const { data: cisData, loading: cisLoading } = useSpecialitiesQuery({
    fetchPolicy: 'no-cache',
  });

  const { data: subData, loading: subLoading } = useSubstancesQuery({
    fetchPolicy: 'no-cache',
  });

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
            .filter((cis) => cis?.name.toLowerCase().startsWith(formattedQuery))
            .slice(0, 50)
            .map((row) => ({ type: 'cis', ...row, code: row?.code ?? '' })) as EntityCis[])
        : [];

      const filteredSub = substances
        ? (substances
            .filter((sub) => sub !== null)
            .filter((sub) => sub?.name.toLowerCase().startsWith(formattedQuery))
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

  const optionsContainerClassname = classnames(
    'AutocompleteContainer bg-white z-[1] w-full border-grey-400 px-0',
    embedded ? 'm-0' : 'rounded-lg absolute max-h-80 overflow-auto border mt-1'
  );

  const debounceInputOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, 200);

  const renderOptions = useCallback(
    () => (
      <Combobox.Options className={optionsContainerClassname}>
        {results.length === 0 && (
          <div className={classnames('text-grey-400', embedded ? 'p-8' : 'py-2 px-4')}>
            Aucun résultat disponible
          </div>
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
                    'py-2 px-4  flex justify-between gap-4',
                    {
                      'bg-grey-100': active,
                      'first:rounded-t-lg last:rounded-b-lg': !embedded,
                    }
                  )
                }
              >
                <div>{result?.name}</div>
                <div className="text-grey-400">{entityTypeLabel(result?.type)}</div>
              </Combobox.Option>
            ))}
          </div>
        )}
      </Combobox.Options>
    ),
    [embedded, optionsContainerClassname, results]
  );

  const isLoading = cisLoading || subLoading;
  const loadingPlaceholder = isLargeDesktop ? 'Chargement des données' : 'Chargement';
  const placeholder = isLargeDesktop
    ? 'Rechercher un médicament, une substance active'
    : 'Rechercher';

  return (
    <>
      <div className="Autocomplete relative">
        <Combobox onChange={onSelected}>
          <Combobox.Input
            autoFocus
            placeholder={cisLoading || subLoading ? loadingPlaceholder : placeholder}
            disabled={cisLoading || subLoading}
            className={classnames(
              'AutocompleteInput w-full',
              embedded
                ? 'border-grey-100 rounded-none sticky top-0 shadow-lg p-4'
                : 'rounded-lg border border-grey-400 py-3 px-4'
            )}
            value={query}
            onChange={debounceInputOnChange}
          />
          {query.length > 3 && renderOptions()}
        </Combobox>
      </div>
      {isLoading ? (
        <div
          role="status"
          className="absolute right-2 top-0 bottom-0 flex justify-center items-center pl-4 z-[1]"
        >
          <LoaderSpinner />
        </div>
      ) : (
        <div className="absolute right-4 bottom-2.5 inset-y-0 pointer-events-none h-full flex justify-center items-center">
          <SearchIcon width={navIconSize} height={navIconSize} alt="search" />
        </div>
      )}
    </>
  );
};
