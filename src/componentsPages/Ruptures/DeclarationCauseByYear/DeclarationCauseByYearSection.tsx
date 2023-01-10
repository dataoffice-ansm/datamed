import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import type { SelectOption } from '../../../components/Select/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { GraphFiguresGrid } from '../../../components/GraphFiguresGrid';
import { GraphFigure } from '../../../components/GraphFigure';
import { getRuptureCauseIcon } from '../../../utils/iconsMapping';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';
import { buildSortedRangeData } from '../../../utils/entities';
import {
  type Cause,
  type RuptureCauseRepartition,
  type RuptureYear,
} from '../../../graphql/__generated__/generated-documents';
import { GraphBoxSelect } from '../../../components/GraphBoxSelect';

export const DeclarationCauseByYearSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { ruptures } = useRupturesPageContext();

  const ruptureYears = useMemo(
    () => buildSortedRangeData<RuptureYear>(ruptures.ruptureYears),
    [ruptures.ruptureYears]
  );

  const rupturesYearsOptions = useMemo(
    () =>
      ruptureYears.map((ruptureYear) => ({
        value: ruptureYear?.value,
        label: ruptureYear?.value.toString(),
      })) as SelectOption[],
    [ruptureYears]
  );

  return (
    <div className="DeclarationCauseByYear my-12">
      <GraphBoxSelect
        title="Causes des signalements de ruptures et risques de rupture de stock"
        className="max-w-full"
        yearsOptions={rupturesYearsOptions}
        render={({ selectedUnitOption, selectedYearOption }) => {
          const selectedRupturesCausesRep =
            ruptures.repartitionPerCause && selectedYearOption
              ? ruptures.repartitionPerCause.find((action) => action?.year === selectedYearOption)
              : ([] as RuptureCauseRepartition);

          const selectedRupturesCauses = buildSortedRangeData<Cause>(
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
