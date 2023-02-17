import type { HTMLAttributes } from 'react';
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type ChartDataset,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export type BubbleChartProps = {
  labels?: string[];
  dataset: ChartDataset<'scatter'>;
  leftLegend?: string;
  bottomLegend?: string;
} & HTMLAttributes<HTMLElement>;

export const BubbleChart = ({
  className,
  labels,
  dataset,
  leftLegend = '',
  bottomLegend = '',
}: BubbleChartProps) => (
  <div className={className}>
    <Scatter
      data={{
        labels,
        datasets: [dataset],
      }}
      height={500}
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
