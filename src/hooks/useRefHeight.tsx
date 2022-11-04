import type React from 'react';
import { useState, useLayoutEffect } from 'react';

/**
 *
 * @param elementRef
 */
export const useRefHeight = (elementRef: React.RefObject<HTMLDivElement>) => {
  const [elementHeight, setElementHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    setElementHeight(elementRef.current?.offsetHeight);
  }, [elementRef, elementRef.current?.offsetHeight]);

  return elementHeight;
};
