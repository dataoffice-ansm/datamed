import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { SelectOption } from '../../../components/Select/Select';
import { Select } from '../../../components/Select/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../../components/BoxInfo';
import FolderSVG from '../../../assets/icons/folder/folder.svg';
import DeclarationWithOneActionSvg from '../../../assets/images/actions/declaration-avec-au-moin-une-mesure.svg';
import { SectionTitle } from '../../../components/SectionTitle';
import { GraphFiguresGrid } from '../../../components/GraphFiguresGrid';
import { GraphFigure } from '../../../components/GraphFigure';
import { getDeclarationActionIcon } from '../../../utils/iconsMapping';
import { GraphBox } from '../../../components/GraphBox/GraphBox';
import { BaseTooltipContent } from '../Tooltip';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';

export type DeclarationActionByYearProps = {
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

export const RupturesDeclarationActionByYear = ({
  defaultOption = 'number',
}: DeclarationActionByYearProps) => {
  const { ruptures } = useRupturesPageContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedUnitOption, setSelectedUnitOption] = useState<OptionsValue>(defaultOption);
  const { repartitionPerAction, ruptureYears } = ruptures;

  const onUnitOptionChange = useCallback((optionKey: OptionsValue) => {
    setSelectedUnitOption(optionKey);
  }, []);

  const options = useMemo(
    () =>
      (ruptureYears ?? []).map((ruptureYear) => ({
        value: ruptureYear?.value,
        label: ruptureYear?.value,
      })),
    [ruptureYears]
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

  const selectedActionData = useMemo(
    () =>
      (repartitionPerAction ?? []).find((action) => action?.year === options[selectedIndex].value),
    [options, repartitionPerAction, selectedIndex]
  );

  const percentWithOneAction = `${
    Math.round(
      Math.round(selectedData?.totalWithAtLeastOneAction ?? 0) / (selectedData?.total ?? 1)
    ) * 100
  } %`;

  return (
    <div>
      {(ruptureYears ?? []).length > 0 ? (
        <div className="flex flex-col gap-8">
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
                onSelectOption={(_, option) => {
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
                  ? selectedData?.totalWithAtLeastOneAction ?? 0
                  : percentWithOneAction
              }`}
              icon={<DeclarationWithOneActionSvg />}
              theme="dark-green"
              className="flex-1"
              tooltip={
                <BaseTooltipContent>
                  <div className="font-medium mb-4 text-lg">Dossiers donnant lieu à une mesure</div>
                  <div>
                    La pharmacovigilance est la surveillance, l’évaluation, la prévention et la
                    gestion du risque d’effet indésirable résultant de l’utilisation des
                    médicaments. Elle s’exerce en permanence, avant et après la commercialisation
                    des médicaments, et constitue un élément essentiel du contrôle de la sécurité
                    des médicaments.
                  </div>
                </BaseTooltipContent>
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

          <GraphBox
            title="Répartition des mesures prises pour pallier ou prévenir les ruptures de stock"
            tooltip={
              <>
                <div className="font-medium mb-4 text-lg">
                  Mesures prises pour palier ou prévenir les ruptures de stock
                </div>
                <div>
                  Lorsqu’un signalement arrive à l’ANSM, est mise en place une évaluation afin de
                  déterminer les mesures les plus adaptées pour pallier l’insuffisance de stock.
                  Plusieurs mesures peuvent être mobilisées pour une même situation de risque ou de
                  rupture de stock, aussi le total peut dépasser 100%.
                </div>
              </>
            }
          >
            <div className="GraphBoxSelectContent">
              <GraphFiguresGrid
                data={(selectedActionData?.actions ?? [])?.filter(
                  (action) => action?.range && action?.value !== undefined && action?.value !== null
                )}
                renderItem={(action) =>
                  action?.range && action?.value ? (
                    <GraphFigure
                      className="pathologyGraphFigure"
                      unit={selectedUnitOption === 'number' ? '' : '%'}
                      description={action.range}
                      icon={getDeclarationActionIcon(action.range)}
                      valueClassName="text-dark-green-900"
                      value={
                        selectedUnitOption === 'number'
                          ? action.value
                          : Math.trunc(
                              (Math.round(action.value ?? 0) / (selectedActionData?.total ?? 1)) *
                                100
                            )
                      }
                    />
                  ) : null
                }
              />
            </div>
          </GraphBox>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};
