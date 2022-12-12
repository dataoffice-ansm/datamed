import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import type { MedicalErrors } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { darkViolet, turquoise } from '../../../tailwind.palette.config';
import { tooltipHandler } from '../../utils/tooltips';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 *
 * @param ageData
 * @constructor
 */
export const PieChartMedicalErrorsPopulation = ({
  errorsMedRepPopData,
  className,
  theme,
}: {
  errorsMedRepPopData: MedicalErrors['populationRepartition'];
  theme?: 'primary' | 'secondary';
  className?: string;
}) => {
  if (!errorsMedRepPopData || !errorsMedRepPopData.length) {
    return <NotEnoughData />;
  }

  const labels = errorsMedRepPopData.map((row) => row?.range);
  const data = errorsMedRepPopData?.map((row) => row?.valuePercent);

  const renderTooltip =
    (range: string) =>
    (value: string): HTMLElement => {
      const repartition = errorsMedRepPopData.find((e) => range === e?.range);
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
