import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip, type TooltipItem } from 'chart.js';
import type {
  GlobalStatistics,
  Speciality,
  Substance,
} from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { numberWithThousand } from '../../utils/format';
import { type RepartitionUsageCommon } from '../../utils/entities';
import { type ChartPalette, chartThemeGradient } from '../../utils/charts';
import { type MedicalErrors } from '../../graphql/__generated__/generated-documents';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 *
 * @param ageData
 * @param className
 * @param theme
 * @constructor
 */
export const PieChartRepartition = ({
  data,
  className,
  theme,
}: {
  data:
    | Speciality['repartitionPerAge']
    | Substance['repartitionPerAge']
    | GlobalStatistics['repartitionPerAge']
    | GlobalStatistics['repartitionPerGravity']
    | MedicalErrors['populationRepartition'];
  theme: ChartPalette;
  className?: string;
}) => {
  const labels = data?.map((row) => row?.range) ?? [];
  const rows = data?.map((row) => row?.valuePercent) ?? [];

  const tooltip = (tooltipItems: Array<TooltipItem<'pie'>>) => {
    const tooltipItem = tooltipItems[0];

    const range = tooltipItem.label;
    const repartition = (data as RepartitionUsageCommon[]).find((e) => range === e?.range);
    const rawValue = repartition?.value ?? 0;
    return [`Nombre: ${numberWithThousand(rawValue)}`];
  };

  const backgroundColor = chartThemeGradient(theme);

  if (!data?.length) {
    return <NotEnoughData />;
  }

  return (
    <div className={className}>
      <Pie
        width={100}
        height={50}
        options={{
          responsive: true,
          maintainAspectRatio: false,
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
              hoverOffset: 6,
              borderWidth: 2,
            },
          ],
        }}
      />
    </div>
  );
};
