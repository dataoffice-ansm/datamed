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
import { BaseTooltipContent } from '../Tooltip';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';
import { type RuptureAction } from '../../../graphql/__generated__/generated-documents';
import { buildSortedRangeData } from '../../../utils/entities';

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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedUnitOption, setSelectedUnitOption] = useState<OptionsValue>(defaultOption);

  const options = useMemo(
    () =>
      (ruptures.ruptureYears ?? []).map((ruptureYear) => ({
        value: ruptureYear?.value,
        label: ruptureYear?.value,
      })),
    [ruptures.ruptureYears]
  );

  const selectedRupturesActionsRepartition = useMemo(
    () =>
      (ruptures.repartitionPerAction ?? []).find(
        (ruptureActionsRep) => ruptureActionsRep?.year === options[selectedIndex].value
      ),
    [options, ruptures.repartitionPerAction, selectedIndex]
  );

  const selectedRupturesActions = useMemo(
    () =>
      buildSortedRangeData<RuptureAction>(selectedRupturesActionsRepartition?.actions, 'number'),
    [selectedRupturesActionsRepartition?.actions]
  );

  const selectedRupturesTotalActionsRepartition = useMemo(
    () =>
      (ruptures?.totalActions ?? []).find(
        (element) => element?.year === options[selectedIndex].value
      ),
    [options, ruptures?.totalActions, selectedIndex]
  );

  const percentWithOneAction = `${
    Math.round(
      Math.round(selectedRupturesTotalActionsRepartition?.totalWithAtLeastOneAction ?? 0) /
        (selectedRupturesTotalActionsRepartition?.total ?? 1)
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
            title="Gestion des d??clarations de ruptures et risques de rupture de stocks"
            subTitle={`Donn??es mises ?? jour mensuellement, issues de la p??riode ${
              selectedRupturesTotalActionsRepartition?.year ?? '- ann??e non disponible'
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
                  ? selectedRupturesTotalActionsRepartition?.totalWithAtLeastOneAction ?? 0
                  : percentWithOneAction
              }`}
              icon={<DeclarationWithOneActionSvg />}
              theme="dark-green"
              className="flex-1"
              tooltip={
                <BaseTooltipContent>
                  <div className="font-medium mb-4 text-lg">Dossiers donnant lieu ?? une mesure</div>
                  <div>
                    La pharmacovigilance est la surveillance, l?????valuation, la pr??vention et la
                    gestion du risque d???effet ind??sirable r??sultant de l???utilisation des
                    m??dicaments. Elle s???exerce en permanence, avant et apr??s la commercialisation
                    des m??dicaments, et constitue un ??l??ment essentiel du contr??le de la s??curit??
                    des m??dicaments.
                  </div>
                </BaseTooltipContent>
              }
            >
              des dossiers ont donn?? lieu ?? au moins une mesure
            </BoxInfo>

            <BoxInfo
              title={selectedRupturesTotalActionsRepartition?.total?.toString() ?? ''}
              icon={<FolderSVG />}
              theme="dark-green"
              className="flex-1"
            >
              Nombre de mesures par ann??e
            </BoxInfo>
          </div>

          <GraphBox
            title="R??partition des mesures prises pour pallier ou pr??venir les ruptures de stock"
            tooltip={
              <>
                <div className="font-medium mb-4 text-lg">
                  Mesures prises pour palier ou pr??venir les ruptures de stock
                </div>
                <div>
                  Lorsqu???un signalement arrive ?? l???ANSM, est mise en place une ??valuation afin de
                  d??terminer les mesures les plus adapt??es pour pallier l???insuffisance de stock.
                  Plusieurs mesures peuvent ??tre mobilis??es pour une m??me situation de risque ou de
                  rupture de stock, aussi le total peut d??passer 100%.
                </div>
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
