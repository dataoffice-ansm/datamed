import type { HTMLAttributes, SetStateAction, Dispatch } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export const navBarHeightPx = 80;
export const stickyHeroHeightPx = 64;

export const layoutContext = createContext<{
  navBarHeight: number;
  stickyHeroHeight: number;
  authed: boolean;
  setNavBarHeight: Dispatch<SetStateAction<number>>;
  setStickyHeroHeight: Dispatch<SetStateAction<number>>;
  setAuthed: Dispatch<SetStateAction<boolean>>;
}>({
  navBarHeight: navBarHeightPx,
  stickyHeroHeight: 0,
  setNavBarHeight: () => null,
  setStickyHeroHeight: () => null,
  authed: false,
  setAuthed: () => null,
});

const { Provider } = layoutContext;

export const LayoutProvider = ({
  children,
  authSSR,
}: HTMLAttributes<HTMLDivElement> & { authSSR: boolean }) => {
  const [navBarHeight, setNavBarHeight] = useState(navBarHeightPx);
  const [stickyHeroHeight, setStickyHeroHeight] = useState(0);
  const [authed, setAuthed] = useState(authSSR);

  const value = useMemo(
    () => ({
      navBarHeight,
      setNavBarHeight,
      stickyHeroHeight,
      setStickyHeroHeight,
      authed,
      setAuthed,
    }),
    [navBarHeight, setNavBarHeight, stickyHeroHeight, setStickyHeroHeight, authed, setAuthed]
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
