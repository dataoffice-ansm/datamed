import classNames from 'classnames';
import type { SelectOption } from '../Select/Select';
import { Select } from '../Select/Select';
import type { Substance } from '../../graphql/__generated__/generated-documents';
import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import SubSVG from '../../assets/icons/sub.svg';
import { SubstanceContainer } from './SubstanceContainer';

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
          Effets indésirables suspectés de la substance active
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
      <div className="SubstancesContainerContent p-6">
        {!substances.length || !selectedSubstance ? (
          <div>Aucune substances disponibles</div>
        ) : (
          <SubstanceContainer substance={selectedSubstance} />
        )}
      </div>
    </div>
  );
};
