import type { HTMLAttributes } from 'react';
import React, { useEffect, useRef } from 'react';
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

export const MixedBarChart = ({
  className,
  labels = [''],
  datasets,
  leftLegend = '',
  bottomLegend = '',
}: BarChartProps) => {
  const ref = useRef<ChartJS<'bar'>>(null);

  useEffect(() => {
    const resize = () => {
      ref.current?.resize();
    };

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={className}>
      <Bar
        ref={ref}
        redraw
        updateMode="resize"
        data={{
          labels,
          datasets,
        }}
        options={{
          responsive: true,
          elements: {
            point: {
              radius: 4,
              hoverRadius: 6,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: bottomLegend,
                // text: <ActeMedicauxFigure className="w-8 h-8" />,
              },
              // ticks: {
              //   // Include a dollar sign in the ticks
              //   callback(value, index, ticks) {
              //     console.log(value, index, ticks);
              //     return `$${value}`;
              //   },
              // },
            },
            y: {
              title: {
                display: true,
                text: leftLegend,
              },
            },
          },
        }}
      />
    </div>
  );
};
