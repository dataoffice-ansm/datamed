import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import type { Speciality } from '../../../graphql/__generated__/generated-documents';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartSpecialityRepAge = ({ speciality }: { speciality: Speciality }) => {
  const ageData = useMemo(
    () => speciality?.repartitionPerAge ?? [],
    [speciality?.repartitionPerAge]
  );

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
          },
        ],
      }}
    />
  );
};
