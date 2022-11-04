import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export const defaultNavBarHeightPx = 80;
export const defaultStickyHeroHeight = 64;

export const layoutContext = createContext<{
  navBarHeight: number;
  stickyHeroHeight: number;
  setNavBarHeight: Dispatch<SetStateAction<number>>;
  setStickyHeroHeight: Dispatch<SetStateAction<number>>;
}>({
  navBarHeight: defaultNavBarHeightPx,
  stickyHeroHeight: defaultStickyHeroHeight,
  setNavBarHeight: () => null,
  setStickyHeroHeight: () => null,
});

const { Provider } = layoutContext;

export const LayoutProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const [navBarHeight, setNavBarHeight] = useState(defaultNavBarHeightPx);
  const [stickyHeroHeight, setStickyHeroHeight] = useState(defaultStickyHeroHeight);
  const value = useMemo(
    () => ({
      navBarHeight,
      setNavBarHeight,
      stickyHeroHeight,
      setStickyHeroHeight,
    }),
    [navBarHeight, setNavBarHeight, stickyHeroHeight, setStickyHeroHeight]
  );

  return <Provider value={value}>{children}</Provider>;
};

export const useLayoutContext = () => {
  const context = useContext(layoutContext);

  if (context === undefined) {
    throw new Error(`${useLayoutContext.name} must be used within a ${LayoutProvider.name}.`);
  }

  return context;
};
