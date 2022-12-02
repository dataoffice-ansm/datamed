import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

/**
 *
 * @param className
 * @param classNameInner
 * @param children
 * @param background
 * @param props
 * @constructor
 */
export const FullWidthRow = ({
  className,
  classNameInner,
  children,
  background,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  background?: JSX.Element | ReactNode;
  classNameInner?: string;
}) => (
  <div className="fullWidthRowContainer relative">
    <div className={classnames('w-screen absolute h-full left-1/2 m-[0_auto_0_-50vw]', className)}>
      {background}
    </div>
    <div
      className={classnames('fullWidthRowInner flex items-center relative', classNameInner)}
      {...props}
    >
      {children}
    </div>
  </div>
);
