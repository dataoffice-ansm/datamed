import type { HTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

export type BarChartProps = {
  labels: string[];
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
};
