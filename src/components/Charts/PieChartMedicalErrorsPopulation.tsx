import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem } from 'chart.js';

import type { MedicalErrors } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { darkViolet, turquoise } from '../../../tailwind.palette.config';
import { numberWithThousand } from '../../utils/format';

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
  if (!errorsMedRepPopData?.length) {
    return <NotEnoughData />;
  }

  const labels = errorsMedRepPopData.map((row) => row?.range);
  const data = errorsMedRepPopData?.map((row) => row?.valuePercent);

  const tooltip = (tooltipItems: Array<TooltipItem<'pie'>>) => {
    const tooltipItem = tooltipItems[0];

    const range = tooltipItem.label;
    const repartition = errorsMedRepPopData.find((e) => range === e?.range);
    const rawValue = repartition?.value ?? 0;
    return [`Nombre: ${numberWithThousand(rawValue)}`];
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
