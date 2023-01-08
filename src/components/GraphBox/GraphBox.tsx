import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import classnames from 'classnames';
import { Tooltip } from '../Tooltip/Tooltip';
import InfoSVG from '../../assets/pictos/icons/info.svg';

/**
 *
 * @param title
 * @param tooltip
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
  tooltip?: JSX.Element | ReactNode;
  title: string;
}) => (
  <div className={classnames('GraphBox rounded-lg shadow bg-white p-4', className)}>
    <div className="GraphBoxTitle flex items-center gap-4 w-full mb-2">
      <div className="flex-1 text-lg font-medium">{title}</div>
      {tooltip && (
        <div className="GraphBoxTooltip flex gap-4 items-center">
          <Tooltip
            content={<div className="p-4 max-w-md">{tooltip}</div>}
            placement="bottom"
            render={(refCb) => (
              <div ref={refCb} className="h-5 w-5">
                <InfoSVG />
              </div>
            )}
          />
        </div>
      )}
    </div>
    {children}
  </div>
);
