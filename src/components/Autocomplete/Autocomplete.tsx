import { Combobox } from '@headlessui/react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import type { ChangeEvent, HTMLAttributes } from 'react';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { entityTypeLabel } from '../../helpers/entitiesHelper';
import type { Entity, EntityCis, EntitySub } from '../../contexts/EntityContext';
import type { Speciality, Substance } from '../../graphql/__generated__/generated-documents';
import {
  useSpecialitiesQuery,
  useSubstancesQuery,
} from '../../graphql/__generated__/generated-documents';

const Loader = () => (
  <div
    role="status"
    className="absolute right-[44px] top-0 bottom-0 flex justify-center items-center pl-4 z-[1]"
  >
    <svg
      aria-hidden="true"
      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="transparent"
      />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
    </svg>
  </div>
);

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
      const specialities = cisData.getSpecialities.specialities as Speciality[];
      const substances = subData.getSubstances.substances as Substance[];

      const filteredCis = specialities
        .filter((cis) => cis !== null)
        .filter((cis) => cis?.name.toLowerCase().startsWith(formattedQuery))
        .slice(0, 50)
        .map((row) => ({ type: 'cis', ...row, cisId: row?.cisId ?? '' })) as EntityCis[];

      const filteredSub = substances
        .filter((sub) => sub !== null)
        .filter((sub) => sub?.name.toLowerCase().startsWith(formattedQuery))
        .slice(0, 50)
        .map((row) => ({ type: 'sub', ...row, code: row?.code ?? '' })) as EntitySub[];

      setResults([...filteredCis, ...filteredSub]);
    }
  }, [query, cisData?.getSpecialities, subData?.getSubstances]);

  const onSelected = async (e: Entity) => {
    const url = e.type === 'sub' ? `/substance/${e.code}` : `/specialite/${e.cisId}`;
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

  return (
    <div className="Autocomplete relative">
      <Combobox onChange={onSelected}>
        {cisLoading || subLoading ? <Loader /> : null}
        <Combobox.Input
          autoFocus
          placeholder={
            cisLoading || subLoading
              ? 'Chargement des données'
              : 'Rechercher un médicament, une substance active'
          }
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
  );
};
