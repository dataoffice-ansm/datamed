// eslint-disable-next-file @typescript-eslint/no-unsafe-call

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import type { Speciality, Substance } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../../components/NotEnoughData';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 *
 * @param ageData
 * @constructor
 */
export const PieChartRepartitionAge = ({
  ageData,
}: {
  ageData: Speciality['repartitionPerAge'] | Substance['repartitionPerAge'];
}) => {
  if (!ageData || !ageData.length) {
    return <NotEnoughData />;
  }

  const labels = ageData.map((row) => row?.range);
  const data = ageData?.map((row) => row?.value);

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
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
