import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import CountUp from 'react-countup';
import Link from 'next/link';
import { formatDecimalToUnit } from '../utils/format';

/**
 *
 * @param value
 * @param description
 * @param link
 * @param icon
 * @param valueClassName
 * @param id
 * @param unit default is '%'
 * @param className
 * @constructor
 */
export const GraphFigure = ({
  value,
  description,
  link,
  icon,
  unit = '%',
  className,
  valueClassName = 'text-primary',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  value: number;
  description: string;
  link: string;
  icon: ReactNode;
  unit?: string;
  valueClassName?: string;
}) => (
  <div
    className={classnames(
      'GraphFigure flex flex-col justify-center items-center max-w-max',
      className
    )}
    {...props}
  >
    <div>{icon}</div>
    <div className={classnames('GraphFigureCountUp text-3xl', valueClassName)}>
      <CountUp formattingFn={(n) => formatDecimalToUnit(n, unit)} end={value} />
    </div>
    <div className="GraphFigureDescription">{description}</div>
    <Link href={link}>
      <a className="GraphFigureDetails text-primary">Voir détails</a>
    </Link>
  </div>
);
