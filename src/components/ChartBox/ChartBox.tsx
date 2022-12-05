import type { ReactNode } from 'react';
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';

/**
 *
 * @param id
 * @param title
 * @param children
 * @param className
 * @constructor
 */
export const ChartBox = ({
  id,
  title,
  children,
  className,
}: HTMLAttributes<HTMLDivElement> & { title: string; children: ReactNode }) => (
  <div
    id={id}
    className={classnames(
      'ChartBox flex flex-col p-4 bg-white rounded-md border border-solid border-grey text-center mx-auto',
      className
    )}
  >
    <h3 className="mt-1">{title}</h3>
    <div className="flex flex-3 items-center justify-center m-2">{children}</div>
  </div>
);
