import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import type { SelectOption } from '../../components/Select';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { GraphFigure } from '../../components/GraphFigure';
import { getRuptureCauseIcon } from '../../utils/iconsMapping';
import { useRupturesPageContext } from '../../contexts/RupturesPageContext';
import { buildSortedRangeData } from '../../utils/entities';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { type RuptureCauseRepartitionCause } from '../../graphql/__generated__/generated-documents';

export const DeclarationCauseByYearSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { ruptureYears, repartitionPerCause } = useRupturesPageContext();

  const rupturesYearsOptions: SelectOption[] = useMemo(
    () =>
      ruptureYears
        ? ruptureYears.reduce<SelectOption[]>(
            (carry, year) => [
              ...carry,
              {
                value: year,
                label: year,
              },
            ],
            []
          )
        : [],
    [ruptureYears]
  );

  return (
    <div className="DeclarationCauseByYear my-8">
      <GraphBoxSelect
        title="Causes des signalements de ruptures et risques de rupture de stock"
        className="max-w-full"
        yearsOptions={rupturesYearsOptions}
        render={({ selectedUnitOption, selectedYearOption }) => {
          const selectedRupturesCausesRep =
            repartitionPerCause && selectedYearOption
              ? repartitionPerCause.find((action) => action?.year === selectedYearOption)
              : null;

          const selectedRupturesCauses = buildSortedRangeData<RuptureCauseRepartitionCause>(
            selectedRupturesCausesRep?.causes ?? [],
            selectedUnitOption
          );

          return (
            <GraphFiguresGrid
              data={selectedRupturesCauses}
              renderItem={(cause) =>
                cause?.range && cause?.value ? (
                  <GraphFigure
                    className="pathologyGraphFigure"
                    unit={selectedUnitOption === 'number' ? '' : '%'}
                    label={cause.range}
                    icon={getRuptureCauseIcon(cause.range)}
                    valueClassName="text-dark-green-900"
                    contentTooltip={cause.description ?? ''}
                    value={
                      selectedUnitOption === 'number'
                        ? cause.value
                        : Math.trunc(Math.round(cause.value) * 100) /
                          (selectedRupturesCausesRep?.total ?? 1)
                    }
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
