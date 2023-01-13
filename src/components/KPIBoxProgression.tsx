import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import { TooltipInformation } from '../componentsPages/Ruptures/Tooltip';
import { numberWithThousand } from '../utils/format';

type PercentageBoxProps = {
  percent: number;
  total: number;
  numberColor: string;
  percentBackgroundColor: string;
  percentForegroundColor: string;
  title: string;
  percentageTitle: string;
  tooltip: JSX.Element | ReactNode;
} & HTMLAttributes<HTMLElement>;

/**
 *
 * @param percent
 * @param numberColor
 * @param percentBackgroundColor
 * @param percentForegroundColor
 * @param percentageTitle
 * @param title
 * @param total
 * @param tooltip
 * @constructor
 */
export const KPIBoxProgression = ({
  percent,
  numberColor,
  percentBackgroundColor,
  percentForegroundColor,
  percentageTitle,
  title,
  total,
  tooltip,
}: PercentageBoxProps) => (
  <div className="PercentageBox flex-1 relative shadow rounded-lg bg-white p-4 flex flex-col gap-2">
    <div className="absolute top-4 right-4">
      <TooltipInformation>
        {/* // fixed width due to absolute positioning */}
        <div className="TooltipContent p-2 w-72">{tooltip}</div>
      </TooltipInformation>
    </div>
    <div className="totalNumber">
      <div className={classNames('font-medium text-2xl md:text-3xl', numberColor)}>
        {numberWithThousand(total)}
      </div>
      <div>{title}</div>
    </div>
    <div className="percentageNumber">
      <div className={classNames('font-medium text-2xl md:text-3xl', numberColor)}>{percent} %</div>
      <div>{percentageTitle}</div>
    </div>
    <div className="percentageProgression">
      <div className={classNames('h-8 w-full relative border', percentBackgroundColor)}>
        <div
          className={classNames('absolute top-0 left-0 bottom-0', percentForegroundColor, {
            'border-r': percent < 100,
          })}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  </div>
);
