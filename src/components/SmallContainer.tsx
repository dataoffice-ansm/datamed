import type { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

export const SmallContainer = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => (
  <div
    className={classnames('SmallContainer lg:w-[760px] md:w-[450px] max-w-max', className)}
    {...props}
  >
    {children}
  </div>
);
