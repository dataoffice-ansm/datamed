import type { HTMLAttributes } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export const defaultNavigationBarHeightPx = 114;

export const navigationBarContext = createContext<{
  setHeight: (height: number) => void;
  height: number;
}>({
  setHeight: () => null,
  height: defaultNavigationBarHeightPx,
});

const { Provider } = navigationBarContext;

export const NavigationBarHeightProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const [height, setHeight] = useState(defaultNavigationBarHeightPx);
  const value = useMemo(() => ({ setHeight, height }), [height, setHeight]);

  return <Provider value={value}>{children}</Provider>;
};

export const useNavigationBarHeightContext = () => {
  const context = useContext(navigationBarContext);

  if (context === undefined) {
    throw new Error(
      `${useNavigationBarHeightContext.name} must be used within a ${NavigationBarHeightProvider.name}.`
    );
  }

  return context;
};
