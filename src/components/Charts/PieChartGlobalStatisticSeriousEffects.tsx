import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip, type TooltipItem } from 'chart.js';

import type { GlobalStatistic } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { numberWithThousand } from '../../utils/format';
import { type RepartitionUsageCommon } from '../../utils/entities';
import { chartThemeGradient } from '../../utils/charts';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 *
 * @param ageData
 * @constructor
 */
export const PieChartGlobalStatisticSeriousEffects = ({
  seriousEffectData = [],
  className,
}: {
  seriousEffectData?:
    | GlobalStatistic['repartitionPerSeriousEffect']
    | GlobalStatistic['repartitionPerGravity'];
  className?: string;
}) => {
  if (!seriousEffectData?.length) {
    return <NotEnoughData />;
  }

  const labels = seriousEffectData.map((row) => row?.range);
  const data = seriousEffectData.map((row) => row?.valuePercent);

  const tooltip = (tooltipItems: Array<TooltipItem<'pie'>>) => {
    const tooltipItem = tooltipItems[0];

    const range = tooltipItem.label;
    if (seriousEffectData && Array.isArray(seriousEffectData)) {
      const repartition = (seriousEffectData as RepartitionUsageCommon[]).find(
        (e) => range === e?.range
      );
      const rawValue = repartition?.value ?? 0;
      return [`Nombre: ${numberWithThousand(rawValue)}`];
    }
  };

  const backgroundColor = chartThemeGradient('green');

  return (
    <div className={className}>
      <Pie
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                afterBody: tooltip,
                label(context) {
                  const percent = context.formattedValue;
                  return `Pourcentage: ${percent}%`;
                },
              },
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor,
              hoverOffset: 4,
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};
