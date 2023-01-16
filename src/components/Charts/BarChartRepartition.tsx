import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import type { GlobalStatistic } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { numberWithThousand } from '../../utils/format';
import { type RepartitionUsageCommon } from '../../utils/entities';
import { type ChartPalette, chartThemeGradient } from '../../utils/charts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 *
 * @param ageData
 * @constructor
 */
export const BarChartRepartition = ({
  data = [],
  dataLabel = '',
  className,
  theme,
}: {
  data?: GlobalStatistic['repartitionPerSeriousEffect'] | GlobalStatistic['repartitionPerGravity'];
  dataLabel?: string;
  theme: ChartPalette;
  className?: string;
}) => {
  if (!data?.length) {
    return <NotEnoughData />;
  }

  const labels = data.map((row) => row?.range);
  const rows = data.map((row) => row?.valuePercent);

  const tooltip = (tooltipItems: Array<TooltipItem<'bar'>>) => {
    const tooltipItem = tooltipItems[0];

    const range = tooltipItem.label;
    if (data && Array.isArray(data)) {
      const repartition = (data as RepartitionUsageCommon[]).find((e) => range === e?.range);
      const rawValue = repartition?.value ?? 0;
      return [`Nombre: ${numberWithThousand(rawValue)}`];
    }
  };

  const backgroundColor = chartThemeGradient(theme);

  return (
    <div className={className}>
      <Bar
        options={{
          responsive: true,
          indexAxis: 'y' as const,
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
              data: rows,
              backgroundColor,
              borderWidth: 2,
              label: dataLabel,
            },
          ],
        }}
      />
    </div>
  );
};
