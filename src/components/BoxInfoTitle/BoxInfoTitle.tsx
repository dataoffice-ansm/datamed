import classNames from 'classnames';
import { Tooltip } from '../Tooltip/Tooltip';
import type { HTMLAttributes, ReactNode } from 'react';
import InfoSVG from '../../assets/icons/info/info.svg';

export type BoxInfoTitleThemeColor = 'primary' | 'secondary' | 'success';

export type BoxInfoTitleProps = {
  icon: JSX.Element | ReactNode;
  iconClassName?: string;
  tooltip?: JSX.Element | ReactNode;
  title: string;
  theme?: BoxInfoTitleThemeColor;
} & HTMLAttributes<HTMLElement>;

export const BoxInfoTitle = ({
  icon,
  title,
  children,
  className,
  iconClassName,
  theme = 'primary',
  tooltip,
}: BoxInfoTitleProps) => (
  <div
    className={classNames(
      'BoxInfoTitleContainer flex flex-col sm:flex-row justify-center align-center shadow p-4 gap-8 bg-white',
      className
    )}
  >
    <div className={classNames('BoxInfoTitleIcon h-24 w-24', iconClassName)}>{icon}</div>
    <div className="flex flex-col flex-auto justify-center gap-2 md:gap-0">
      <div
        className={classNames('BoxInfoTitle text-3xl', {
          'text-primary': theme === 'primary',
          'text-secondary': theme === 'secondary',
          'text-success': theme === 'success',
        })}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
    {tooltip && (
      <div className="BoxInfoTitleTooltip flex justify-center items-center">
        <Tooltip
          content={<div className="p-4">{tooltip}</div>}
          placement="auto-start"
          render={(refCb) => (
            <div ref={refCb} className="h-5 w-5">
              <InfoSVG />
            </div>
          )}
        />
      </div>
    )}
  </div>
);
