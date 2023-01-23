/**
 *
 * @param title
 * @param subTitle
 * @constructor
 */
import type { ReactNode } from 'react';

export const SectionTitle = ({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle?: string;
  children?: ReactNode | JSX.Element;
}) => (
  <div className="SectionTitle">
    <div className="flex flex-col md:flex-row items-start justify-between gap-4 mt-8 mb-2 md:mb-0">
      <h2 className="text-2xl lg:text-3xl font-medium text-left mt-0 mb-2">{title}</h2>
      {children}
    </div>
    {subTitle && <h6 className="mt-0 mb-6 text-left">{subTitle}</h6>}
  </div>
);
