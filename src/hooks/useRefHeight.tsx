import type React from 'react';
import { useState, useEffect, useCallback } from 'react';

/**
 *
 * @param elementRef
 */
export const useRefHeight = (elementRef: React.RefObject<HTMLDivElement>) => {
  const [navbarHeight, setNavbarHeight] = useState<number | undefined>(0);

  const handleElementHeight = useCallback(() => {
    setNavbarHeight(elementRef.current?.offsetHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, elementRef.current?.offsetHeight]);

  useEffect(() => {
    handleElementHeight();
  }, [handleElementHeight]);

  useEffect(() => {
    window.addEventListener('resize', handleElementHeight);
    return () => {
      window.removeEventListener('resize', handleElementHeight);
    };
  }, [handleElementHeight]);

  return navbarHeight ?? 0;
};
