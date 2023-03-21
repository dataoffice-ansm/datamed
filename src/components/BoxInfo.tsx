import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import { TooltipInformation } from './TooltipInformation';

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
      'BoxInfo justify-center align-center rounded-lg shadow p-4 gap-8 bg-white',
      className
    )}
  >
    <div className="hidden sm:flex gap-3">
      <div className={classNames('BoxInfoIcon flex align-center h-24 w-24', iconClassName)}>
        {icon}
      </div>

      <div className="BoxInfoContent flex flex-col flex-auto justify-center gap-2 md:gap-0">
        <div
          className={classNames('BoxInfoTitleContainer flex justify-start items-center gap-3', {
            'text-primary': theme === 'primary',
            'text-secondary': theme === 'secondary',
            'text-dark-green': theme === 'dark-green',
            'text-success': theme === 'success',
          })}
        >
          <span className="BoxInfoTitle text-2xl lg:text-3xl font-medium">{title}</span>
          {tooltip && (
            <TooltipInformation>
              <div className="TooltipContent p-2 max-w-md">{tooltip}</div>
            </TooltipInformation>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>

    <div className="flex flex-col sm:hidden">
      <div className="flex items-center align-center  gap-2">
        <div
          className={classNames(
            'BoxInfoIcon flex items-center align-center h-16 w-16 sm:h-20 sm:w-20',
            iconClassName
          )}
        >
          {icon}
        </div>
        <div className="BoxInfoContent flex flex-col flex-auto justify-center gap-2 md:gap-0">
          <div
            className={classNames('BoxInfoTitleContainer flex justify-start items-center gap-3', {
              'text-primary': theme === 'primary',
              'text-secondary': theme === 'secondary',
              'text-dark-green': theme === 'dark-green',
              'text-success': theme === 'success',
            })}
          >
            <span className="BoxInfoTitle text-lg sm:text-2xl lg:text-3xl font-medium">
              {title}
            </span>
            {tooltip && (
              <TooltipInformation>
                <div className="TooltipContent p-2 max-w-md">{tooltip}</div>
              </TooltipInformation>
            )}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  </div>
);
