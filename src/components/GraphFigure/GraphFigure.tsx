import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import CountUp from 'react-countup';
import { formatDecimalToUnit } from '../../utils/format';
import type { Maybe } from '../../graphql/__generated__/generated-documents';

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
  value,
  description,
  icon,
  action,
  unit = '%',
  className,
  valueClassName = 'text-primary',
  descriptionClassName,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  value: number | Maybe<number> | undefined;
  description: string | Maybe<string> | undefined;
  icon: ReactNode;
  action?: ReactNode;
  unit?: string;
  valueClassName?: string;
  descriptionClassName?: string;
}) => (
  <div
    className={classnames(
      'GraphFigure flex flex-col justify-start items-center max-w-max',
      className
    )}
    {...props}
  >
    <div className="h-20 md:h-28 w-20 md:w-28">{icon}</div>
    <div className={classnames('GraphFigureCountUp text-3xl', valueClassName)}>
      <CountUp formattingFn={(n) => formatDecimalToUnit(n, unit)} end={value ?? 0} />
    </div>
    <div className={classnames('GraphFigureDescription', descriptionClassName)}>{description}</div>
    {action}
  </div>
);
