import { type MutableRefObject, useEffect } from 'react';

export const useClickOutsideRef = (ref: MutableRefObject<any>, cb: () => void) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(e: MouseEvent) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (ref.current && !ref.current.contains(e.target)) {
        cb();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cb, ref]);
};
