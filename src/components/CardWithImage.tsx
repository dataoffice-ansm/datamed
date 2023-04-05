import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

/**
 *
 * @param className
 * @param imageClassName
 * @param contentClassName
 * @param image
 * @param title
 * @param button
 * @param children
 * @constructor
 */
export const CardWithImage = ({
  className,
  imageClassName,
  contentClassName,
  image,
  title,
  button,
  children,
}: HTMLAttributes<HTMLDivElement> & {
  image: ReactNode;
  contentClassName?: string;
  imageClassName?: string;
  title?: string;
  button?: ReactNode;
}) => (
  <div
    className={classnames(
      'CardWithImage bg-white w-full flex flex-col lg:flex-row gap-4 pt-6 lg:pt-0',
      className
    )}
  >
    <div
      className={classnames('flex-none m-auto min-w-fit max-w-xl overflow-hidden', imageClassName)}
    >
      {image}
    </div>
    <div
      className={classnames(
        'flex flex-col justify-center items-center text-center lg:text-left p-4',
        contentClassName
      )}
    >
      {title && <div className="text-md lg:text-xl font-bold">{title}</div>}
      <div className="description gap-8 text-base lg:text-md">{children}</div>
      {button && <div className="BoxLinkAction flex">{button}</div>}
    </div>
  </div>
);
