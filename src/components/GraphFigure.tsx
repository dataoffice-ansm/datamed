import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import CountUp from 'react-countup';
import { formatDecimalToUnit } from '../utils/format';
import type { Maybe } from '../graphql/__generated__/generated-documents';

/**
 *
 * @param value
 * @param description
 * @param link
 * @param icon
 * @param valueClassName
 * @param unit default is '%'
 * @param className
 * @constructor
 */
export const GraphFigure = ({
  value = 0,
  description,
  icon,
  action,
  unit = '%',
  className,
  valueClassName = 'text-primary',
  descriptionClassName,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  value: number;
  description: string;
  icon: ReactNode;
  action?: ReactNode;
  unit?: string;
  valueClassName?: string;
  descriptionClassName?: string;
}) => (
  <div
    className={classnames(
      'GraphFigure flex flex-col justify-start items-center gap-1 max-w-max text-center',
      className
    )}
    {...props}
  >
    {icon}
    <div className={classnames('GraphFigureCountUp text-3xl', valueClassName)}>
      <CountUp formattingFn={(n) => formatDecimalToUnit(n, unit)} end={value} />
    </div>
    <div className={classnames('GraphFigureDescription', descriptionClassName)}>{description}</div>
    {action}
  </div>
);
