import classNames from 'classnames';
import type { SelectOption } from '../../components/Select/Select';
import { Select } from '../../components/Select/Select';
import type { Substance } from '../../graphql/__generated__/generated-documents';
import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import SubSVG from '../../assets/icons/sub.svg';

export type SubstancesContainerProps = {
  substances: Substance[];
} & HTMLAttributes<HTMLDivElement>;

export const SubstancesContainer = ({
  substances,
  children,
  className,
}: SubstancesContainerProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const options: SelectOption[] = useMemo(
    () =>
      substances.map((substance) => ({
        label: substance.name,
        value: substance.id,
      })),
    [substances]
  );

  const substance = substances[selectedIndex];

  const onChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className={classNames('SubstancesContainer bg-secondary-50', className)}>
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
        {substances.length === 0 && <div>Aucune substances disponibles</div>}
        {substances.length > 0 && (
          <div>
            <div className="SubstancesContainerContentTitle text-left text-xl">
              Substance active sélectionnée :{' '}
              <span className="text-secondary-900 font-medium">{substance?.name}</span>
            </div>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
