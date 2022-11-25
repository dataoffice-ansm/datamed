import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import CountUp from 'react-countup';
import { formatDecimalToUnit } from '../../utils/format';
import type { CallToActionButtonProps, CallToActionLinkProps } from '../CallToAction/CallToAction';
import { CallToAction } from '../CallToAction/CallToAction';

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
  icon,
  callToActionProps,
  unit = '%',
  className,
  valueClassName = 'text-primary',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  value: number;
  description: string;
  icon: ReactNode;
  callToActionProps: CallToActionLinkProps | CallToActionButtonProps;
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
    <CallToAction {...callToActionProps} className="GraphFigureDetails text-primary">
      Voir détails
    </CallToAction>
  </div>
);
