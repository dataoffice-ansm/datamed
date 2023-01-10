import classNames from 'classnames';
import { Tooltip } from './Tooltip/Tooltip';
import type { HTMLAttributes, ReactNode } from 'react';
import InfoSVG from '../assets/pictos/icons/info.svg';

export type BoxInfoTitleThemeColor = 'primary' | 'secondary' | 'success' | 'dark-green';

export type BoxInfoTitleProps = {
  icon: JSX.Element | ReactNode;
  iconClassName?: string;
  tooltip?: JSX.Element | ReactNode;
  title: string;
  theme?: BoxInfoTitleThemeColor;
} & HTMLAttributes<HTMLElement>;

/**
 *
 * @param icon
 * @param title
 * @param children
 * @param className
 * @param iconClassName
 * @param theme
 * @param tooltip
 * @constructor
 */
export const BoxInfo = ({
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
      'BoxInfo flex flex-col sm:flex-row justify-center align-center shadow p-4 gap-8 bg-white',
      className
    )}
  >
    <div className={classNames('BoxInfoIcon h-24 w-24', iconClassName)}>{icon}</div>
    <div className="BoxInfoContent flex flex-col flex-auto justify-center gap-2 md:gap-0">
      <div
        className={classNames('BoxInfoTitleContainer flex justify-start items-center gap-3', {
          'text-primary': theme === 'primary',
          'text-secondary': theme === 'secondary',
          'text-dark-green': theme === 'dark-green',
          'text-success': theme === 'success',
        })}
      >
        <span className="BoxInfoTitle text-3xl font-medium">{title}</span>
        {tooltip && (
          <div className="BoxInfoTooltip flex justify-center items-center">
            <Tooltip
              content={<div className="p-2">{tooltip}</div>}
              placement="bottom"
              render={(refCb) => (
                <div ref={refCb} className="h-6 w-6">
                  <InfoSVG />
                </div>
              )}
            />
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  </div>
);
