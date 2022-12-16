import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { GlobalRupture } from 'graphql/__generated__/generated-documents';
import type { SelectOption } from '../../../components/Select/Select';
import { Select } from '../../../components/Select/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../../components/BoxInfo';
import FolderSVG from '../../../assets/icons/folder/folder.svg';
import DeclarationWithOneActionSvg from '../../../assets/images/actions/declaration-avec-au-moin-une-mesure.svg';
import { SectionTitle } from '../../../components/SectionTitle';

export type GestionDeclarationActionByYearProps = {
  ruptures: GlobalRupture;
  defaultOption?: OptionsValue;
} & HTMLAttributes<HTMLDivElement>;

const unitOptions = {
  percent: { label: 'Pourcentage' },
  number: { label: 'Nombre' },
} as const;

type OptionsValue = keyof typeof unitOptions;

const selectUnitOptions: Array<SelectOption<OptionsValue>> = Object.entries(unitOptions).map(
  ([k, v]) => ({
    value: k as OptionsValue,
    ...v,
  })
);

const findOptionIndex = (selectedOption: OptionsValue) =>
  (Object.keys(unitOptions) as OptionsValue[]).findIndex((option) => option === selectedOption);

export const GestionDeclarationByYear = ({
  ruptures,
  defaultOption = 'number',
}: GestionDeclarationActionByYearProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedUnitOption, setSelectedUnitOption] = useState<OptionsValue>(defaultOption);

  const onUnitOptionChange = useCallback((optionKey: OptionsValue) => {
    setSelectedUnitOption(optionKey);
  }, []);

  const options = useMemo(
    () =>
      (ruptures?.ruptureYears ?? []).map((ruptureYear) => ({
        value: ruptureYear?.value,
        label: ruptureYear?.value,
      })),
    [ruptures?.ruptureYears]
  );

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const selectedData = useMemo(
    () =>
      (ruptures?.totalAction ?? []).find(
        (element) => element?.year === options[selectedIndex].value
      ),
    [options, ruptures?.totalAction, selectedIndex]
  );

  const percentWithOneAction = `${
    Math.round(Math.round(selectedData?.totalWithOneAction ?? 0) / (selectedData?.total ?? 1)) * 100
  } %`;
  return (
    <div>
      {(ruptures?.ruptureYears ?? []).length > 0 ? (
        <>
          <SectionTitle
            title="Gestion des déclarations de ruptures et risques de rupture de stocks"
            subTitle={`Données mises à jour mensuellement, issues de la période ${
              selectedData?.year ?? '- année non disponible'
            }`}
          >
            <div className="flex gap-2">
              <Select
                theme="secondary-variant"
                defaultOptionIndex={findOptionIndex(defaultOption)}
                options={selectUnitOptions}
                className=""
                onSelectOption={(index, option) => {
                  onUnitOptionChange(option.value as OptionsValue);
                }}
              />
              <Select
                options={options as unknown as SelectOption[]}
                theme="secondary-variant"
                onSelectOption={onSelectedYear}
              />
            </div>
          </SectionTitle>
          <div className="flex gap-8 flex-col md:flex-row">
            <BoxInfo
              title={`${
                selectedUnitOption === 'number'
                  ? selectedData?.totalWithOneAction
                  : percentWithOneAction
              }`}
              icon={<DeclarationWithOneActionSvg />}
              theme="dark-green"
              className="flex-1"
              tooltip={
                <div className="p-4 max-w-md">
                  <div className="font-medium mb-4 text-lg">Dossiers donnant lieu à une mesure</div>
                  <div>
                    La pharmacovigilance est la surveillance, l’évaluation, la prévention et la
                    gestion du risque d’effet indésirable résultant de l’utilisation des
                    médicaments. Elle s’exerce en permanence, avant et après la commercialisation
                    des médicaments, et constitue un élément essentiel du contrôle de la sécurité
                    des médicaments.
                  </div>
                </div>
              }
            >
              des dossiers ont donné lieu à au moins une mesure
            </BoxInfo>
            <BoxInfo
              title={selectedData?.total?.toString() ?? ''}
              icon={<FolderSVG />}
              theme="dark-green"
              className="flex-1"
            >
              Nombre de mesures par année
            </BoxInfo>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};
