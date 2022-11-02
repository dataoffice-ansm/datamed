import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import classnames from 'classnames';

export const GraphBox = ({
  title,
  children,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  title: string;
}) => (
  <div className={classnames('bg-white rounded-lg shadow max-w-max p-6', className)}>
    <div className="font-medium pb-4">{title}</div>
    {children}
  </div>
);
