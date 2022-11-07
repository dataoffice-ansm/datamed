import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export const defaultNavBarHeightPx = 80;

export const navBarContext = createContext<{
  setNavBarHeight: Dispatch<SetStateAction<number>>;
  navBarHeight: number;
}>({
  setNavBarHeight: () => null,
  navBarHeight: defaultNavBarHeightPx,
});

const { Provider } = navBarContext;

export const NavBarProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const [navBarHeight, setNavBarHeight] = useState(defaultNavBarHeightPx);
  const value = useMemo(() => ({ navBarHeight, setNavBarHeight }), [navBarHeight, setNavBarHeight]);

  return <Provider value={value}>{children}</Provider>;
};

export const useNavBarContext = () => {
  const context = useContext(navBarContext);

  if (context === undefined) {
    throw new Error(`${useNavBarContext.name} must be used within a ${NavBarProvider.name}.`);
  }

  return context;
};
