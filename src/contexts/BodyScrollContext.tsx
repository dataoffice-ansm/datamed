import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { createContext, useMemo, useState, useEffect, useContext } from 'react';

export const BodyScrollContext = createContext<{
  scrollEnabled: boolean;
  setScrollEnabled: Dispatch<SetStateAction<boolean>>;
}>({
  scrollEnabled: true,
  setScrollEnabled: () => null,
});

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

  return <BodyScrollContext.Provider value={value}>{children}</BodyScrollContext.Provider>;
};

export const useBodyScrollContext = () => {
  const context = useContext(BodyScrollContext);

  if (context === undefined) {
    throw new Error(
      `${useBodyScrollContext.name} must be used within a ${BodyScrollProvider.name}.`
    );
  }

  return context;
};
