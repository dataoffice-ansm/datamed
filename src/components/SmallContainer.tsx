import type { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

export const SmallContainer = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => (
  <div
    className={classnames('SmallContainer lg:max-w-[760px] md:max-w-[640px] max-w-max', className)}
    {...props}
  >
    {children}
  </div>
);
