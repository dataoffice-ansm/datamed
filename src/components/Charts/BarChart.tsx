import type { HTMLAttributes } from 'react';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

export type BarChartProps = {
  labels?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  leftLegend?: string;
  bottomLegend?: string;
} & HTMLAttributes<HTMLElement>;

export const BarChart = ({
  className,
  labels,
  datasets,
  leftLegend = '',
  bottomLegend = '',
}: BarChartProps) => (
  <div className={className}>
    <Bar
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
