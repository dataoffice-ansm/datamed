import type React from 'react';
import { useState } from 'react';
import { useIsomorphicLayoutEffect } from '../utils/web';

/**
 *
 * @param elementRef
 */
export const useRefHeight = (elementRef: React.RefObject<HTMLDivElement>) => {
  const [elementHeight, setElementHeight] = useState<number | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    setElementHeight(elementRef.current?.offsetHeight);
  }, [elementRef, elementRef.current?.offsetHeight]);

  return elementHeight;
};
