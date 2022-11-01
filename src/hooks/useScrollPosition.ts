import { useCallback, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../utils/web';

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  /**
   * @name handleScroll
   * @return void
   * @description
   * Handle scroll user interaction (applied only when responsive menu not active)
   * - Reduce padding of navigation bar when user scroll after the navigation bar height
   * - Get back the initial height when back top the top
   */
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    scrollY,
  };
};
