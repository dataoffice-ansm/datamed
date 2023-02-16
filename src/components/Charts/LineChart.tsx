import type { HTMLAttributes } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import classNames from 'classnames';

ChartJS.register(...registerables);

export type LineChartProps = {
  labels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  leftLegend?: string;
  bottomLegend?: string;
} & HTMLAttributes<HTMLElement>;

export const LineChart = ({
  className,
  labels,
  datasets,
  leftLegend = '',
  bottomLegend = '',
}: LineChartProps) => (
  <div className={classNames('relative', className)}>
    <Line
      data={{
        labels,
        datasets,
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: bottomLegend,
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: leftLegend,
            },
            grid: {
              display: true,
            },
          },
        },
      }}
    />
  </div>
);
