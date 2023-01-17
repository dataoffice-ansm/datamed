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
import {
  type RuptureAction,
  type RuptureActionRepartition,
  type RuptureTotalAction,
} from '../../graphql/__generated__/generated-documents';
import { buildSortedRangeData } from '../../utils/entities';
import { numberWithThousand } from '../../utils/format';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { getRuptureActionTypeDescription } from '../../api/utils/mapping';

export const RupturesDeclarationActionByYearSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { ruptures } = useRupturesPageContext();

  const yearsOptions: Array<SelectOption<number>> = useMemo(
    () =>
      (ruptures?.totalActions ?? []).map((ruptureYear) => ({
        value: ruptureYear?.year ?? 0,
        label: ruptureYear?.year?.toString() ?? '',
      })),
    [ruptures?.totalActions]
  );

  return (
    <div className="RupturesDeclarationActionByYearSection mb-12">
      <GraphBoxSelect
        title="Gestion des déclarations de ruptures et risques de rupture de stocks"
        className="my-8"
        // subTitle={`Données mises à jour mensuellement, issues de la période ${
        //     selectedRupturesTotalActionsRepartition?.year ?? '- année non disponible'
        // }`}
        yearsOptions={yearsOptions}
        render={({ selectedYearOption, selectedUnitOption }) => {
          const selectedRupturesTotalActionsRepartition =
            ruptures?.totalActions && selectedYearOption
              ? ruptures?.totalActions.find((element) => element?.year === selectedYearOption)
              : ([] as RuptureTotalAction);

          const percentWithOneAction = `${
            Math.round(
              Math.round(
                selectedRupturesTotalActionsRepartition?.totalDeclarationsWithMesure ?? 0
              ) / (selectedRupturesTotalActionsRepartition?.totalDeclarationsWithMesure ?? 1)
            ) * 100
          } %`;

          return (
            <div className="flex gap-8 flex-col md:flex-row">
              <BoxInfo
                title={`${
                  selectedUnitOption === 'number'
                    ? numberWithThousand(
                        selectedRupturesTotalActionsRepartition?.totalDeclarationsWithMesure ?? 0
                      )
                    : percentWithOneAction
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
                      La pharmacovigilance est la surveillance, l’évaluation, la prévention et la
                      gestion du risque d’effet indésirable résultant de l’utilisation des
                      médicaments. Elle s’exerce en permanence, avant et après la commercialisation
                      des médicaments, et constitue un élément essentiel du contrôle de la sécurité
                      des médicaments.
                    </p>
                  </>
                }
              >
                des déclarations ont donné lieu à au moins une mesure
              </BoxInfo>

              <BoxInfo
                title={`${numberWithThousand(
                  selectedRupturesTotalActionsRepartition?.totalMesures ?? 0
                )}`}
                icon={<FolderSVG className="h-24 w-24" />}
                theme="dark-green"
                className="flex-1"
              >
                Nombre de mesures par année
              </BoxInfo>
            </div>
          );
        }}
      />

      <GraphBoxSelect
        title="Répartition des mesures prises pour pallier ou prévenir les ruptures de stock"
        yearsOptions={yearsOptions}
        className="my-8"
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
        render={({ selectedUnitOption, selectedYearOption }) => {
          const selectedRupturesActionsRepartition =
            ruptures.repartitionPerAction && selectedYearOption
              ? ruptures.repartitionPerAction.find(
                  (ruptureActionsRep) => ruptureActionsRep?.year === selectedYearOption
                )
              : ([] as RuptureActionRepartition);

          const selectedRupturesActions = buildSortedRangeData<RuptureAction>(
            selectedRupturesActionsRepartition?.actions,
            'number'
          );

          return (
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
          );
        }}
      />
    </div>
  );
};
