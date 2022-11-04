import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export const defaultNavBarHeightPx = 80;

export const navBarContext = createContext<{
  setHeight: Dispatch<SetStateAction<number>>;
  height: number;
}>({
  setHeight: () => null,
  height: defaultNavBarHeightPx,
});

const { Provider } = navBarContext;

export const NavBarProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const [height, setHeight] = useState(defaultNavBarHeightPx);
  const value = useMemo(() => ({ setHeight, height }), [height, setHeight]);

  return <Provider value={value}>{children}</Provider>;
};

export const useNavBarContext = () => {
  const context = useContext(navBarContext);

  if (context === undefined) {
    throw new Error(`${useNavBarContext.name} must be used within a ${NavBarProvider.name}.`);
  }

  return context;
};
