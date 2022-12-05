import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import type { MedicalErrors } from '../../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../../../components/NotEnoughData';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 *
 * @param ageData
 * @constructor
 */
export const PieChartMedicalErrorsPopulation = ({
  errorsMedRepPopData,
}: {
  errorsMedRepPopData: MedicalErrors['populationRepartition'];
}) => {
  if (!errorsMedRepPopData || !errorsMedRepPopData.length) {
    return <NotEnoughData />;
  }

  const labels = errorsMedRepPopData.map((row) => row?.range);
  const data = errorsMedRepPopData?.map((row) => row?.value);

  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            label: 'My First Dataset',
            data,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4,
          },
        ],
      }}
    />
  );
};