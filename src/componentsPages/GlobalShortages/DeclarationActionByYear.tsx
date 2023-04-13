import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import type { SelectOption } from '../../components/Select';
import { BoxInfo } from '../../components/BoxInfo';
import FolderSVG from '../../assets/pictos/folder.svg';
import DeclarationWithOneActionSvg from '../../assets/pictos/actions/declaration-avec-au-moin-une-mesure.svg';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { GraphFigure } from '../../components/GraphFigure';
import { getDeclarationActionIcon } from '../../utils/iconsMapping';
import { useGlobalShortagesPageContext } from '../../contexts/GlobalShortagesContext';
import { type ShortagesMeasuresPerYear } from '../../graphql/__generated__/generated-documents';
import { buildSortedRangeData } from '../../utils/entities';
import { numberWithThousand } from '../../utils/format';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { GraphBox } from '../../components/GraphBox/GraphBox';

export const RupturesDeclarationActionByYearSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { shortagesPerYear, shortagesMeasuresPerYear } = useGlobalShortagesPageContext();

  const years = useMemo(
    () => shortagesMeasuresPerYear?.map((e) => e.year) ?? [],
    [shortagesMeasuresPerYear]
  );

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const globalShortagesYearsOptions: SelectOption[] = useMemo(() => {
    const measuresYears = years.reduce<Array<SelectOption<number>>>((carry, year) => {
      const already = carry.find((e) => e.value === year);
      return already
        ? carry
        : [
            ...carry,
            {
              value: year,
              label: String(year),
            },
          ];
    }, []);
    return measuresYears.sort((a, b) => a.value - b.value).reverse();
  }, [years]);

  return (
    <div className="RupturesDeclarationActionByYearSection">
      <GraphBoxSelect
        layoutSection
        title="Gestion des déclarations de ruptures et risques de rupture de stock"
        subtitle={
          minYear && maxYear
            ? `Données issues de la période ${String(minYear)} - ${String(maxYear)}`
            : 'Période non disponible'
        }
        yearsOptions={globalShortagesYearsOptions}
        theme="secondary-variant"
        render={({ selectedYearOption, selectedUnitOption }) => {
          const casesWithMeasureCount =
            shortagesPerYear?.find((e) => e.year === selectedYearOption)?.casesWithMeasuresCount ??
            0;

          const casesWithMeasuresCountPercent =
            shortagesPerYear?.find((e) => e.year === selectedYearOption)
              ?.casesWithMeasuresCountPercent ?? 0;

          const measuresCount =
            shortagesPerYear?.find((e) => e.year === selectedYearOption)?.measuresCount ?? 0;

          const shortagesActionForSelectedYear =
            shortagesMeasuresPerYear && selectedYearOption
              ? shortagesMeasuresPerYear.filter((element) => element?.year === selectedYearOption)
              : [];

          const shortagesActionsRepartition = buildSortedRangeData<ShortagesMeasuresPerYear>(
            shortagesActionForSelectedYear,
            'number'
          );

          return (
            <div className="inner">
              <div className="flex gap-8 flex-col md:flex-row">
                <BoxInfo
                  title={`${
                    selectedUnitOption === 'number'
                      ? casesWithMeasureCount
                      : `${casesWithMeasuresCountPercent} %`
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
                        risques et génèrent l&apos;ouverture d&apos;un dossier qui sera suivi par
                        les équipes de l&apos;ANSM jusqu&apos;à remise à disposition normale du
                        médicament. Certaines situations, plus critiques nécessitent, la mise en
                        place de mesures permettant de limiter au maximum l&apos;impact sur
                        l&apos;accès au traitement.
                      </p>
                    </>
                  }
                >
                  des déclarations ont donné lieu à au moins une mesure
                </BoxInfo>

                <BoxInfo
                  title={`${numberWithThousand(measuresCount)}`}
                  icon={<FolderSVG className="h-24 w-24" />}
                  theme="dark-green"
                  className="flex-1"
                >
                  Nombre de mesures par année
                </BoxInfo>
              </div>

              <GraphBox
                title="Répartition des mesures prises pour limiter l’impact des ruptures de stock"
                className="my-8"
                tooltip={
                  <>
                    <p className="font-medium mb-4 text-lg">
                      Mesures prises pour limiter l&apos;impact des ruptures de stock
                    </p>
                    <p>
                      Toute déclaration de rupture ou de risque de rupture de stock reçue par
                      l&apos;ANSM fait l&apos;objet d&apos;une évaluation afin de déterminer les
                      mesures les plus adaptées pour pallier l&apos;insuffisance de stock.
                    </p>
                  </>
                }
              >
                <GraphFiguresGrid
                  data={shortagesActionsRepartition}
                  renderItem={(action) =>
                    action?.type && action?.value && action.valuePercent ? (
                      <GraphFigure
                        className="pathologyGraphFigure"
                        unit={selectedUnitOption === 'number' ? '' : '%'}
                        label={action.type}
                        icon={getDeclarationActionIcon(action.type)}
                        valueClassName="text-dark-green-900"
                        contentTooltip={action.definition ?? ''}
                        value={selectedUnitOption === 'number' ? action.value : action.valuePercent}
                      />
                    ) : null
                  }
                />
              </GraphBox>
            </div>
          );
        }}
      />
    </div>
  );
};
