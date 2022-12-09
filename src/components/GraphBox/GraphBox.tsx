import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import classnames from 'classnames';
import { Tooltip } from '../Tooltip/Tooltip';
import InfoSVG from '../../assets/icons/info/info.svg';

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
  <div className={classnames('GraphBox rounded-lg shadow bg-white max-w-max p-4', className)}>
    <div className="GraphBoxTitle font-medium mb-4">
      <span>{title}</span>
      {tooltip && (
        <div className="GraphBoxTooltip flex justify-center items-center">
          <Tooltip
            content={<div className="p-2">{tooltip}</div>}
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
    {children}
  </div>
);
