import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import type { SelectOption } from '../../components/Select';
import { BoxInfo } from '../../components/BoxInfo';
import FolderSVG from '../../assets/pictos/folder.svg';
import DeclarationWithOneActionSvg from '../../assets/pictos/actions/declaration-avec-au-moin-une-mesure.svg';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { GraphFigure } from '../../components/GraphFigure';
import { getDeclarationActionIcon } from '../../utils/iconsMapping';
import { useRupturesPageContext } from '../../contexts/RupturesPageContext';
import { type RuptureAction } from '../../graphql/__generated__/generated-documents';
import { buildSortedRangeData } from '../../utils/entities';
import { numberWithThousand } from '../../utils/format';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { GraphBox } from '../../components/GraphBox/GraphBox';

export const RupturesDeclarationActionByYearSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { totalActions, repartitionPerAction } = useRupturesPageContext();

  const yearsOptions: Array<SelectOption<string>> = useMemo(
    () =>
      (totalActions ?? [])
        .filter((r) => r?.year)
        .map((ruptureYear) => ({
          value: ruptureYear?.year ?? '',
          label: ruptureYear?.year ?? '',
        })),
    [totalActions]
  );

  return (
    <div className="RupturesDeclarationActionByYearSection">
      <GraphBoxSelect
        layoutSection
        title="Gestion des déclarations de ruptures et risques de rupture de stocks"
        subtitle="Données issues de la période 2021 -2022"
        // subTitle={`Données mises à jour mensuellement, issues de la période ${
        //     selectedRupturesTotalActionsRepartition?.year ?? '- année non disponible'
        // }`}
        yearsOptions={yearsOptions}
        render={({ selectedYearOption, selectedUnitOption }) => {
          const selectedRupturesTotalActionsRepartition =
            totalActions && selectedYearOption
              ? totalActions.find((element) => element?.year === selectedYearOption)
              : null;

          const selectedRupturesActionsRepartition =
            repartitionPerAction && selectedYearOption
              ? repartitionPerAction.find(
                  (ruptureActionsRep) => ruptureActionsRep?.year === selectedYearOption
                )
              : null;

          const selectedRupturesActions = buildSortedRangeData<RuptureAction>(
            selectedRupturesActionsRepartition?.actions ?? [],
            'number'
          );

          const countCasesWithMeasure = numberWithThousand(
            selectedRupturesTotalActionsRepartition?.totalDeclarationsWithMeasure?.value ?? 0
          );

          const countCasesWithMeasurePercent =
            selectedRupturesTotalActionsRepartition?.totalDeclarationsWithMeasure?.valuePercent ??
            0;

          return (
            <div className="inner">
              <div className="flex gap-8 flex-col md:flex-row">
                <BoxInfo
                  title={`${
                    selectedUnitOption === 'number'
                      ? countCasesWithMeasure
                      : `${countCasesWithMeasurePercent} %`
                  }`}
                  icon={<DeclarationWithOneActionSvg className="h-24 w-24" />}
                  theme="dark-green"
                  className="flex-1"
                  tooltip={
                    <>
                      <p className="font-medium mb-4 text-lg">
                        Déclarations donnant lieu à une mesure
                      </p>
                      <p>
                        Toutes les déclarations reçues font l&apos;objet d&apos;une analyse de
                        risque et génèrent l&apos;ouverture d&apos;un dossier qui sera suivi par les
                        équipes de l&apos;ANSM jusqu&apos;à remise à disposition normale du
                        médicament. Certaines situations, plus critiques nécessitent, la mise en
                        place de mesures préventives ou palliatives afin de limiter au maximum
                        l&apos;impact sur l&apos;accès au traitement.
                      </p>
                    </>
                  }
                >
                  des déclarations ont donné lieu à au moins une mesure
                </BoxInfo>

                <BoxInfo
                  title={`${numberWithThousand(
                    selectedRupturesTotalActionsRepartition?.totalMeasures ?? 0
                  )}`}
                  icon={<FolderSVG className="h-24 w-24" />}
                  theme="dark-green"
                  className="flex-1"
                >
                  Nombre de mesures par année
                </BoxInfo>
              </div>

              <GraphBox
                title="Répartition des mesures prises pour pallier ou prévenir les ruptures de stock"
                className="my-8"
                tooltip={
                  <>
                    <p className="font-medium mb-4 text-lg">
                      Mesures prises pour palier ou prévenir les ruptures de stock
                    </p>
                    <p>
                      Lorsqu’un signalement arrive à l’ANSM, est mise en place une évaluation afin
                      de déterminer les mesures les plus adaptées pour pallier l’insuffisance de
                      stock. Plusieurs mesures peuvent être mobilisées pour une même situation de
                      risque ou de rupture de stock, aussi le total peut dépasser 100%.
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
                      contentTooltip={action.description ?? ''}
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
          );
        }}
      />
    </div>
  );
};
