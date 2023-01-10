import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

/**
 *
 * @param className
 * @param imageClassName
 * @param image
 * @param title
 * @param button
 * @param children
 * @constructor
 */
export const CardWithImage = ({
  className,
  imageClassName,
  image,
  title,
  button,
  children,
}: HTMLAttributes<HTMLDivElement> & {
  image: ReactNode;
  imageClassName: string;
  title: string;
  button: ReactNode;
}) => (
  <div className={classnames('CardWithImage bg-white w-full lg:flex pt-6 lg:pt-0', className)}>
    <div className={classnames('flex-none m-auto w-40 w-full overflow-hidden', imageClassName)}>
      {image}
    </div>
    <div className="flex flex-col p-4 items-center text-center lg:items-start lg:text-left">
      <div className="text-md lg:text-xl font-bold">{title}</div>
      <div className="description gap-8 my-4 text-base lg:text-md">{children}</div>
      <div className="BoxLinkAction flex">{button}</div>
    </div>
  </div>
);
