import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import CountUp from 'react-countup';
import { formatDecimalToUnit } from '../utils/format';
import { Tooltip } from './Tooltip/Tooltip';

/**
 *
 * @param value
 * @param description
 * @param icon
 * @param valueClassName
 * @param unit default is '%'
 * @param className
 * @constructor
 */
export const GraphFigure = ({
  value = 0,
  label,
  icon,
  action,
  unit = '%',
  className,
  valueClassName = 'text-primary',
  descriptionClassName,
  contentTooltip,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  value: number;
  label: string;
  icon?: ReactNode;
  action?: ReactNode;
  unit?: string;
  valueClassName?: string;
  descriptionClassName?: string;
  contentTooltip?: string;
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
    {contentTooltip ? (
      <div>
        <Tooltip
          placement="bottom"
          render={(refCb) => (
            <span ref={refCb} className="underline cursor-help">
              {label}
            </span>
          )}
          content={<div className="p-4">{contentTooltip}</div>}
        />
        {action}
      </div>
    ) : (
      <section>
        <div className={classnames('GraphFigureDescription', descriptionClassName)}>{label}</div>
        {action}
      </section>
    )}
  </div>
);
