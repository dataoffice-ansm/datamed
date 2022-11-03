import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import CountUp from 'react-countup';
import Link from 'next/link';
import { convertToPercentage, formatPercentage } from '../utils/format';

export const GraphFigure = ({
  percentage,
  description,
  link,
  icon,
  percentageClassName = 'text-primary',
  id,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  percentage: number;
  description: string;
  link: string;
  icon: ReactNode;
  percentageClassName?: string;
}) => (
  <div
    id={id}
    className={classnames('GraphFigure flex flex-col justify-center item-center', className)}
  >
    <div>{icon}</div>
    <div className={classnames('text-3xl pl-14', percentageClassName)}>
      <CountUp formattingFn={formatPercentage} end={convertToPercentage(percentage)} />
    </div>
    <div className="ml-12">{description}</div>
    <Link href={link}>
      <a className="text-primary ml-10">Voir détails</a>
    </Link>
  </div>
);
