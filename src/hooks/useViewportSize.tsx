import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { isBrowser } from '../utils/web';

export const useViewportSize = isBrowser
  ? () => {
      const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
      });

      useEffect(() => {
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };

        const debouncedHandle = debounce(handleResize, 300, { maxWait: 1000, trailing: true });

        window.addEventListener('resize', debouncedHandle);
        handleResize();

        return () => {
          window.removeEventListener('resize', debouncedHandle);
        };
      }, []);

      return windowSize;
    }
  : () => ({ width: undefined, height: undefined });
