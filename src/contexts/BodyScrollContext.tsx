import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { createContext, useMemo, useState, useEffect } from 'react';

export const bodyScrollContext = createContext<{
  scrollEnabled: boolean;
  setScrollEnabled: Dispatch<SetStateAction<boolean>>;
}>({
  scrollEnabled: true,
  setScrollEnabled: () => null,
});

const { Provider } = bodyScrollContext;

export const BodyScrollProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const value = useMemo(
    () => ({ scrollEnabled, setScrollEnabled }),
    [scrollEnabled, setScrollEnabled]
  );

  useEffect(() => {
    if (scrollEnabled) {
      document.body.classList.remove('overflow-hidden');
    } else if (!document.body.classList.contains('overflow-hidden')) {
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [scrollEnabled]);

  return <Provider value={value}>{children}</Provider>;
};
