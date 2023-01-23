import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import classnames from 'classnames';
import { TooltipInformation } from '../../componentsPages/Ruptures/Tooltip';

/**
 *
 * @param title
 * @param tooltip
 * @param suffix
 * @param children
 * @param className
 * @constructor
 */
export const GraphBox = ({
  title,
  tooltip,
  children,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  title?: string;
  tooltip?: JSX.Element | ReactNode;
}) => (
  <div className={classnames('GraphBox rounded-lg shadow bg-white p-4', className)}>
    <div className="GraphBoxTitle flex items-start gap-4 w-full text-left mb-4">
      {title && <span className="text-lg font-medium">{title}</span>}
      {tooltip && (
        <TooltipInformation>
          <div className="TooltipContent p-2 max-w-md">{tooltip}</div>
        </TooltipInformation>
      )}
    </div>
    {children}
  </div>
);
