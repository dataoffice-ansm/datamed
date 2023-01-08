import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip, type TooltipItem } from 'chart.js';

import type {
  GlobalStatistic,
  RepartitionRange,
} from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { darkGreen } from '../../../tailwind.palette.config';
import { numberWithThousand } from '../../utils/format';

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
  seriousEffectData:
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
      const repartition = (seriousEffectData as unknown as RepartitionRange[]).find(
        (e) => range === e?.range
      );
      const rawValue = repartition?.value ?? 0;
      return [`Nombre: ${numberWithThousand(rawValue)}`];
    }
  };

  const backgroundColor = [
    darkGreen[200],
    darkGreen[50],
    darkGreen[100],
    darkGreen[300],
    darkGreen[400],
    darkGreen[500],
    darkGreen[600],
    darkGreen[700],
    darkGreen[800],
    darkGreen[900],
  ];

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
