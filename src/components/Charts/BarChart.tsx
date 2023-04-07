import type { HTMLAttributes } from 'react';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, type ChartDataset, registerables } from 'chart.js';

ChartJS.register(...registerables);

export type BarChartProps = {
  labels?: string[];
  dataset: ChartDataset<'bar'>;
  leftLegend?: string;
  bottomLegend?: string;
} & HTMLAttributes<HTMLElement>;

export const BarChart = ({
  className,
  labels,
  dataset,
  leftLegend = '',
  bottomLegend = '',
}: BarChartProps) => (
  <div className={className}>
    <Bar
      height={500}
      data={{
        labels,
        datasets: [dataset],
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
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  </div>
);
