import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { darkViolet, turquoise } from '../../../tailwind.palette.config';
import type { Speciality, Substance } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../../components/NotEnoughData';
import { tooltipHandler } from './Tooltip';

ChartJS.register(ArcElement, Tooltip, Legend);

const renderTooltip = (value: string): HTMLElement => {
  const content = document.createElement('span');
  content.innerHTML = `Proportion <strong>${value}</strong>%`;
  return content;
};

/**
 *
 * @param ageData
 * @constructor
 */
export const PieChartRepartitionAge = ({
  ageData,
  className,
  theme = 'primary',
}: {
  className?: string;
  ageData: Speciality['repartitionPerAge'] | Substance['repartitionPerAge'];
  theme?: 'primary' | 'secondary';
}) => {
  if (!ageData || !ageData.length) {
    return <NotEnoughData />;
  }

  const labels = ageData.map((row) => row?.range);
  const data = ageData?.map((row) => row?.value);
  const backgroundColor =
    theme === 'primary'
      ? [darkViolet[200], darkViolet[500], darkViolet[900]]
      : [turquoise[200], turquoise[500], turquoise[900]];

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
