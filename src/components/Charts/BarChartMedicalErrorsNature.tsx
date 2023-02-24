import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

import type { MedicalErrors } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { chartThemeGradient } from '../../utils/charts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 *
 * @param ageData
 * @constructor
 */
export const BarChartMedicalErrorsNature = ({
  natureMedicalErrors,
  dataKey,
  className,
}: {
  natureMedicalErrors: MedicalErrors['natureRepartition'];
  dataKey: 'number' | 'percent';
  className?: string;
}) => {
  if (!natureMedicalErrors?.length) {
    return <NotEnoughData />;
  }

  const labels = natureMedicalErrors.map((row) => row?.nature);
  const data = natureMedicalErrors?.map((row) =>
    dataKey === 'percent' ? row?.valuePercent : row?.value
  );

  const backgroundColor = chartThemeGradient('primary-full');

  return (
    <div className={className}>
      <Bar
        redraw
        updateMode="resize"
        options={{
          responsive: true,
          indexAxis: 'y' as const,
          scales: {
            x: {
              title: {
                display: true,
                text: dataKey === 'percent' ? 'Proportion (%)' : 'Proportion (Nombre)',
              },
            },
          },
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              display: false
            },
          }
        }}
        data={{
          labels,
          datasets: [
            {
              data,
              label: 'Nature des erreurs médicamenteuses',
              backgroundColor,
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};
