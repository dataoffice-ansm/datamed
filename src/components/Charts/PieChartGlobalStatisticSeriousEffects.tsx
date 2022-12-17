import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

import type {
  GlobalStatistic,
  Maybe,
  RepartitionPerGravity,
  RepartitionPerSeriousEffect,
} from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { darkGreen } from '../../../tailwind.palette.config';
import { tooltipHandler } from '../../utils/tooltips';

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
  if (!seriousEffectData || !seriousEffectData.length) {
    return <NotEnoughData />;
  }

  const labels = seriousEffectData.map((row) => row?.range);
  const data = seriousEffectData.map((row) => row?.valuePercent);

  const renderTooltip =
    (range: string) =>
    (value: string): HTMLElement => {
      const repartition = (
        seriousEffectData as Array<
          Maybe<RepartitionPerSeriousEffect> | Maybe<RepartitionPerGravity>
        >
      )?.find((e) => range === e?.range);
      const content = document.createElement('span');
      content.innerHTML = `
    <div>
      <div>Pourcentage: <strong>${value}</strong>%</div>
      <div>Nombre: <strong>${repartition?.value ?? '-'}</strong></div>
    </div>
    `;
      return content;
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
              enabled: false,
              position: 'nearest',
              external: tooltipHandler(renderTooltip) as never,
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
