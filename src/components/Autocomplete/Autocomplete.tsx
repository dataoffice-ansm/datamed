import { Combobox } from '@headlessui/react';
import classnames from 'classnames';
import type { Entity } from '../../api/interfaces/models';
import { entityTypeLabel, entityTypeRoute } from '../../api/interfaces/models';
import { useRouter } from 'next/router';
import type { ChangeEvent, HTMLAttributes } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useFetchSpecialities } from '../../services/specialities';
import { useFetchSubstances } from '../../services/substances';
import debounce from 'lodash/debounce';

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
  const { data: specialities } = useFetchSpecialities();
  const { data: substances } = useFetchSubstances();
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Entity[]>([]);

  useEffect(() => {
    const formattedQuery = query.toLowerCase();
    if (specialities && substances) {
      setResults([
        ...specialities.results
          .filter(({ name }) => name.toLowerCase().includes(formattedQuery))
          .slice(0, 50),
        ...substances.results
          .filter(({ name }) => name.toLowerCase().includes(formattedQuery))
          .slice(0, 50),
      ]);
    }
  }, [query, specialities, substances]);

  const onSelected = async (e: Entity) => {
    const prefix = entityTypeRoute(e.type);
    if (prefix) {
      const url = `/${prefix}/${e.id}`;

      if (handleOnSelected) handleOnSelected();
      await router.push(url);
    }
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
                key={result.id}
                value={result}
                className={({ active }) =>
                  classnames(
                    'AutocompleteOption cursor-pointer list-none border-b last:border-none border-grey-400 py-2 px-4  flex justify-between gap-4',
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
        <Combobox.Input
          autoFocus
          placeholder="Rechercher"
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
