import AppendixAnchor from '../AppendixSection/AppendixAnchor';
import type { HTMLAttributes } from 'react';
import { FullWidthRow } from '../FullWidthRow';

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
  offsetHeight?: number;
}) => (
  <>
    <FullWidthRow className={className} style={{ minHeight: `calc(100vh - ${offsetHeight}px)` }}>
      {children}
    </FullWidthRow>
    {appendixAnchor && <AppendixAnchor appendixAnchor={appendixAnchor} />}
  </>
);
