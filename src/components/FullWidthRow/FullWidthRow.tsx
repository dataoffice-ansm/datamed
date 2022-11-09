import classnames from 'classnames';
import type { HTMLAttributes } from 'react';

/**
 *
 * @param className
 * @param classNameInner
 * @param children
 * @param props
 * @constructor
 */
export const FullWidthRow = ({
  className,
  classNameInner,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { classNameInner?: string }) => (
  <div className="fullWidthRowContainer relative">
    <div
      className={classnames('w-screen absolute h-full left-1/2 m-[0_auto_0_-50vw]', className)}
    />
    <div
      className={classnames('fullWidthRowInner flex items-center relative', classNameInner)}
      {...props}
    >
      {children}
    </div>
  </div>
);
