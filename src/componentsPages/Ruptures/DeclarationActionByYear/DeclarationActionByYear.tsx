import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { SelectOption } from '../../../components/Select';
import { Select } from '../../../components/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../../components/BoxInfo';
import FolderSVG from '../../../assets/pictos/folder.svg';
import DeclarationWithOneActionSvg from '../../../assets/pictos/actions/declaration-avec-au-moin-une-mesure.svg';
import { SectionTitle } from '../../../components/SectionTitle';
import { GraphFiguresGrid } from '../../../components/GraphFiguresGrid';
import { GraphFigure } from '../../../components/GraphFigure';
import { getDeclarationActionIcon } from '../../../utils/iconsMapping';
import { GraphBox } from '../../../components/GraphBox/GraphBox';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';
import { type RuptureAction } from '../../../graphql/__generated__/generated-documents';
import { buildSortedRangeData } from '../../../utils/entities';
import { numberWithThousand } from '../../../utils/format';

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

export const RupturesDeclarationActionByYearSection = ({
  defaultOption = 'number',
}: DeclarationActionByYearProps) => {
  const { ruptures } = useRupturesPageContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(2022);
  const [selectedUnitOption, setSelectedUnitOption] = useState<OptionsValue>(defaultOption);

  const options = useMemo(
    () =>
      (ruptures?.totalActions ?? []).map((ruptureYear) => ({
        value: ruptureYear?.year,
        label: ruptureYear?.year,
      })),
    [ruptures?.totalActions]
  );

  const selectedRupturesActionsRepartition = useMemo(
    () =>
      (ruptures.repartitionPerAction ?? []).find(
        (ruptureActionsRep) => ruptureActionsRep?.year === selectedIndex
      ),
    [ruptures.repartitionPerAction, selectedIndex]
  );

  const selectedRupturesActions = useMemo(
    () =>
      buildSortedRangeData<RuptureAction>(selectedRupturesActionsRepartition?.actions, 'number'),
    [selectedRupturesActionsRepartition?.actions]
  );

  const selectedRupturesTotalActionsRepartition = useMemo(
    () => (ruptures?.totalActions ?? []).find((element) => element?.year === selectedIndex),
    [options, ruptures?.totalActions, selectedIndex]
  );

  console.log(selectedIndex);

  const percentWithOneAction = `${
    Math.round(
      Math.round(selectedRupturesTotalActionsRepartition?.totalDeclarationsWithMesure ?? 0) /
        (selectedRupturesTotalActionsRepartition?.totalDeclarationsWithMesure ?? 1)
    ) * 100
  } %`;

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const onSelectUnit = useCallback((optionKey: OptionsValue) => {
    setSelectedUnitOption(optionKey);
  }, []);

  return (
    <div className="RupturesDeclarationActionByYearSection my-12">
      {(ruptures.ruptureYears ?? []).length > 0 ? (
        <div className="flex flex-col gap-8">
          <SectionTitle
            title="Gestion des déclarations de ruptures et risques de rupture de stocks"
            subTitle={`Données mises à jour mensuellement, issues de la période ${
              selectedRupturesTotalActionsRepartition?.year ?? '- année non disponible'
            }`}
          >
            <div className="flex gap-2">
              <Select
                theme="secondary-variant"
                defaultOptionIndex={findOptionIndex(defaultOption)}
                options={selectUnitOptions}
                className=""
                onSelectOption={(_, option) => {
                  onSelectUnit(option.value as OptionsValue);
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
                  ? numberWithThousand(
                      selectedRupturesTotalActionsRepartition?.totalDeclarationsWithMesure ?? 0
                    )
                  : percentWithOneAction
              }`}
              icon={<DeclarationWithOneActionSvg />}
              theme="dark-green"
              className="flex-1"
              tooltip={
                <>
                  <p className="font-medium mb-4 text-lg">Dossiers donnant lieu à une mesure</p>
                  <p>
                    La pharmacovigilance est la surveillance, l’évaluation, la prévention et la
                    gestion du risque d’effet indésirable résultant de l’utilisation des
                    médicaments. Elle s’exerce en permanence, avant et après la commercialisation
                    des médicaments, et constitue un élément essentiel du contrôle de la sécurité
                    des médicaments.
                  </p>
                </>
              }
            >
              des dossiers ont donné lieu à au moins une mesure
            </BoxInfo>

            <BoxInfo
              title={`${numberWithThousand(
                selectedRupturesTotalActionsRepartition?.totalMesures ?? 0
              )}`}
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
                <p className="font-medium mb-4 text-lg">
                  Mesures prises pour palier ou prévenir les ruptures de stock
                </p>
                <p>
                  Lorsqu’un signalement arrive à l’ANSM, est mise en place une évaluation afin de
                  déterminer les mesures les plus adaptées pour pallier l’insuffisance de stock.
                  Plusieurs mesures peuvent être mobilisées pour une même situation de risque ou de
                  rupture de stock, aussi le total peut dépasser 100%.
                </p>
              </>
            }
          >
            <GraphFiguresGrid
              data={selectedRupturesActions}
              renderItem={(action) => (
                <GraphFigure
                  className="pathologyGraphFigure"
                  unit={selectedUnitOption === 'number' ? '' : '%'}
                  label={action.range}
                  icon={getDeclarationActionIcon(action.range)}
                  valueClassName="text-dark-green-900"
                  value={
                    selectedUnitOption === 'number'
                      ? action.value
                      : Math.trunc(
                          (Math.round(action.value ?? 0) /
                            (selectedRupturesActionsRepartition?.total ?? 1)) *
                            100
                        )
                  }
                />
              )}
            />
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
