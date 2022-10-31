import AppendixAnchor from './AppendixAnchor';
import { HTMLAttributes } from 'react';
import { FullWidthRow } from './FullWidthRow';

/**
 *
 * @param className
 * @param children
 * @param appendixAnchor
 * @param offsetHeight
 * @constructor
 */
export const FullScreenSection = ({
  className,
  children,
  appendixAnchor,
  offsetHeight = 0,
}: HTMLAttributes<HTMLDivElement> & {
  appendixAnchor?: string;
  containerClassnames?: string;
  offsetHeight?: number;
}) => {
  return (
    <>
      <FullWidthRow className={className} style={{ height: `calc(100vh - ${offsetHeight}px` }}>
        {children}
      </FullWidthRow>
      {appendixAnchor && <AppendixAnchor appendixAnchor={appendixAnchor} />}
    </>
  );
};
