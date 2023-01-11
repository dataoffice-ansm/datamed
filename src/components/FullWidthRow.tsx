import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

/**
 *
 * @param className
 * @param classNameInner
 * @param children
 * @param background
 * @param flexContent
 * @param props
 * @constructor
 */
export const FullWidthRow = ({
  className,
  classNameInner,
  children,
  background,
  flexContent = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  background?: JSX.Element | ReactNode;
  classNameInner?: string;
  flexContent?: boolean;
}) => (
  <div className="fullWidthRowContainer relative">
    <div className={classNames('w-screen absolute h-full left-1/2 m-[0_auto_0_-50vw]', className)}>
      {background}
    </div>
    <div
      className={classNames('fullWidthRowInner relative', classNameInner, {
        'flex items-center': flexContent,
      })}
      {...props}
    >
      {children}
    </div>
  </div>
);
