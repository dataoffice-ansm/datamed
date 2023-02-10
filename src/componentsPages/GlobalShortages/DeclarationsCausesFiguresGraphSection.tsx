import { type HTMLAttributes, useMemo } from 'react';
import { useGlobalShortagesPageContext } from '../../contexts/GlobalShortagesContext';
import { type SelectOption } from '../../components/Select';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { buildSortedRangeData } from '../../utils/entities';
import { type ShortagesCausesPerYear } from '../../graphql/__generated__/generated-documents';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { GraphFigure } from '../../components/GraphFigure';
import { getRuptureCauseIcon } from '../../utils/iconsMapping';

export const DeclarationsCausesFiguresGraphSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { shortagesPerYear, shortagesCausesPerYear } = useGlobalShortagesPageContext();

  const globalShortagesYearsOptions: SelectOption[] = useMemo(
    () =>
      shortagesPerYear
        ? shortagesPerYear.reduce<SelectOption[]>(
            (carry, row) => [
              ...carry,
              {
                value: row.year,
                label: String(row.year),
              },
            ],
            []
          )
        : [],
    [shortagesPerYear]
  );

  return (
    <div className="DeclarationCauseByYear">
      <GraphBoxSelect
        title="Causes des signalements de ruptures et risques de rupture de stock"
        className="max-w-full"
        yearsOptions={globalShortagesYearsOptions}
        render={({ selectedUnitOption, selectedYearOption }) => {
          const shortagesCauseForSelectedYear =
            shortagesCausesPerYear && selectedYearOption
              ? shortagesCausesPerYear.filter((action) => action?.year === selectedYearOption)
              : [];

          const selectedShortagesCausesRep = buildSortedRangeData<ShortagesCausesPerYear>(
            shortagesCauseForSelectedYear,
            selectedUnitOption
          );

          return (
            <GraphFiguresGrid
              data={selectedShortagesCausesRep}
              renderItem={(cause) =>
                cause?.type && cause?.value && cause.valuePercent ? (
                  <GraphFigure
                    className="pathologyGraphFigure"
                    unit={selectedUnitOption === 'number' ? '' : '%'}
                    label={cause.type}
                    icon={getRuptureCauseIcon(cause.type)}
                    valueClassName="text-dark-green-900"
                    contentTooltip={cause.definition ?? ''}
                    value={selectedUnitOption === 'number' ? cause.value : cause.valuePercent}
                  />
                ) : null
              }
            />
          );
        }}
      />
    </div>
  );
};
