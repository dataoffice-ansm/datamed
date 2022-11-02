import type React from 'react';
import { useState, useEffect, useCallback } from 'react';

/**
 *
 * @param elementRef
 */
export const useRefHeight = (elementRef: React.RefObject<HTMLDivElement>) => {
  const [elementHeight, setElementHeight] = useState<number | undefined>(0);

  const handleElementHeight = useCallback(() => {
    setElementHeight(elementRef.current?.offsetHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, elementRef.current?.offsetHeight]);

  useEffect(() => {
    setTimeout(() => {
      handleElementHeight();
    }, 300);

    window.addEventListener('resize', handleElementHeight);
    return () => {
      window.removeEventListener('resize', handleElementHeight);
    };
  }, [handleElementHeight]);

  return elementHeight ?? 0;
};
