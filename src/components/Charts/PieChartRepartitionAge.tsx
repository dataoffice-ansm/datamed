import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip, type TooltipItem } from 'chart.js';
import { darkGreen, darkViolet, turquoise } from '../../../tailwind.palette.config';
import type { Speciality, Substance } from '../../graphql/__generated__/generated-documents';
import { NotEnoughData } from '../NotEnoughData';
import { numberWithThousand } from '../../utils/format';

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

  const tooltip = (tooltipItems: Array<TooltipItem<'pie'>>) => {
    const tooltipItem = tooltipItems[0];

    const range = tooltipItem.label;
    const repartition = ageData.find((e) => range === e?.range);
    const rawValue = repartition?.value ?? 0;
    return [`Nombre: ${numberWithThousand(rawValue)}`];
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
