import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { darkGreen, darkViolet, turquoise } from '../../../tailwind.palette.config';
import type { Speciality, Substance } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { tooltipHandler } from '../../utils/tooltips';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 *
 * @param ageData
 * @param className
 * @param theme
 * @constructor
 */
export const PieChartRepartitionAge = ({
  ageData,
  className,
  theme = 'primary',
}: {
  ageData: Speciality['repartitionPerAge'] | Substance['repartitionPerAge'];
  theme?: 'primary' | 'secondary' | 'secondary-variant';
  className?: string;
}) => {
  if (!ageData?.length) {
    return <NotEnoughData />;
  }

  const labels = ageData.map((row) => row?.range);
  const data = ageData?.map((row) => row?.valuePercent);

  const renderTooltip =
    (range: string) =>
    (value: string): HTMLElement => {
      const repartition = ageData.find((e) => range === e?.range);
      const content = document.createElement('span');
      content.innerHTML = `
    <div>
      <div>Pourcentage: <strong>${value}</strong>%</div>
      <div>Nombre: <strong>${repartition?.value ?? '-'}</strong></div>
    </div>
    `;
      return content;
    };

  const backgroundColor =
    theme === 'primary'
      ? [darkViolet[200], darkViolet[500], darkViolet[900]]
      : theme === 'secondary'
      ? [turquoise[200], turquoise[500], turquoise[900]]
      : [darkGreen[200], darkGreen[500], darkGreen[900]];

  return (
    <div className={className}>
      <Pie
        options={{
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
