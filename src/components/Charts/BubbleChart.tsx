import type { HTMLAttributes } from 'react';
import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export type BubbleChartProps = {
  labels?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  leftLegend?: string;
  bottomLegend?: string;
} & HTMLAttributes<HTMLElement>;

export const BubbleChart = ({
  className,
  labels,
  datasets,
  leftLegend = '',
  bottomLegend = '',
}: BubbleChartProps) => (
  <div className={className}>
    <Bubble
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
