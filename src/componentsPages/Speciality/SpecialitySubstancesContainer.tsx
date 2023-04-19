import classNames from 'classnames';
import type { SelectOption } from '../../components/Select';
import { Select } from '../../components/Select';
import type { Substance } from '../../graphql/__generated__/generated-documents';
import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import SubSVG from '../../assets/pictos/sub.svg';
import { SubstanceSideEffects } from '../Substance/SubstanceSideEffects';

export type SpecialitySubstancesContainerProps = {
  substances: Substance[];
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 * @param substances
 * @param className
 * @constructor
 */
export const SpecialitySubstancesContainer = ({
  substances,
  className,
}: SpecialitySubstancesContainerProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const options: SelectOption[] = useMemo(
    () =>
      substances.map((substance) => ({
        label: substance.name,
        value: substance.id,
      })),
    [substances]
  );

  const selectedSubstance = substances[selectedIndex];

  const onChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className={classNames('SpecialitySubstancesContainer bg-secondary-50', className)}>
      <div className="SubstancesContainerHeader bg-secondary-900 flex gap-4 justify-start items-center p-4 flex-wrap">
        <SubSVG className="SubstancesContainerHeaderIcon h-14 w-14" />
        <span className="SubstancesContainerHeaderTitle text-xl md:text-2xl text-white flex-auto flex justify-start font-medium text-left">
          Effets indésirables suspectés d’être dus à la substance active
        </span>
        <div className="SubstancesContainerHeaderSelect w-full max-w-xs">
          <Select
            theme="secondary"
            defaultOptionIndex={selectedIndex}
            options={options}
            onSelectOption={onChange}
          />
        </div>
      </div>
      <div className="SubstancesContainerContent py-4 px-2 sm:px-6 sm-py-6">
        {!substances.length || !selectedSubstance ? (
          <div>Aucune substances disponibles</div>
        ) : (
          <div>
            <span className="text-left text-xl">
              Substance active sélectionnée :{' '}
              <span className="text-secondary-900 font-medium">{selectedSubstance?.name}</span>
            </span>
            <SubstanceSideEffects substance={selectedSubstance} />
          </div>
        )}
      </div>
    </div>
  );
};
