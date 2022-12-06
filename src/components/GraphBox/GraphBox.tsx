import type { HTMLAttributes } from 'react';
import React from 'react';
import classnames from 'classnames';

/**
 *
 * @param title
 * @param children
 * @param className
 * @constructor
 */
export const GraphBox = ({
  title,
  children,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  title: string;
}) => (
  <div className={classnames('bg-white rounded-lg shadow max-w-max p-3', className)}>
    <div className="font-medium p-4">{title}</div>
    {children}
  </div>
);
