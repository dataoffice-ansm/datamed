import classNames from 'classnames';
import type { SelectOption } from '../Select/Select';
import { Select } from '../Select/Select';
import type { Substance } from '../../graphql/__generated__/generated-documents';
import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import SubSVG from '../../assets/icons/sub.svg';
import { SubstanceContainer } from './SubstanceContainer';
import Link from 'next/link';
import SickPerson from '../../assets/images/sick_transparent_person.svg';

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
          <div>
            <span className="text-left text-xl">
              Substance active sélectionnée :{' '}
              <span className="text-secondary-900 font-medium">{selectedSubstance?.name}</span>
            </span>
            <SubstanceContainer substance={selectedSubstance}>
              <div className="bg-white p-8 shadow rounded-lg mt-8 flex flex-col justify-center items-center lg:flex-row lg:justify-start gap-8">
                <div className="h-48 w-48">
                  <SickPerson />
                </div>
                <div className="">
                  <div className="text-2xl md:text-3xl">
                    Comment déclarer un effet indésirable ?
                  </div>
                  <div className="my-8">
                    Découvrez comment l’ANSM centralise les signalements et alertes, et que faire
                    selon votre situation.
                  </div>
                  <Link href="#">
                    <a className="text-primary rounded border border-primary py-2 px-4 no-underline">
                      VOIR LES RECOMMANDATIONS DE L&apos;ANSM
                    </a>
                  </Link>
                </div>
              </div>
            </SubstanceContainer>
          </div>
        )}
      </div>
    </div>
  );
};
