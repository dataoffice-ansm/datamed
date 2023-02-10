import type { Context, HTMLAttributes } from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { GlobalShortages } from '../graphql/__generated__/generated-documents';

type GlobalShortagesContextData = {
  shortages: GlobalShortages;
};

export const GlobalShortagesContext = createContext<GlobalShortages>({
  period: {},
  shortagesPerYear: {},
  shortagesClassesPerYear: {},
  shortagesCausesPerYear: {},
  shortagesAtcPerYear: {},
  shortagesMeasuresPerYear: {},
} as GlobalShortages);

/**
 *
 * @param entity
 * @param children
 * @constructor
 */
export const GlobalShortagesContextProvider = ({
  shortages,
  children,
}: HTMLAttributes<HTMLDivElement> & GlobalShortagesContextData) => {
  const value = useMemo(() => ({ ...shortages }), [shortages]);

  return (
    <GlobalShortagesContext.Provider value={value}>{children}</GlobalShortagesContext.Provider>
  );
};

export const useGlobalShortagesPageContext = () => {
  const context = useContext<GlobalShortages>(
    GlobalShortagesContext as unknown as Context<GlobalShortages>
  );

  if (!context) {
    throw new Error(
      `${GlobalShortagesContextProvider.name} must be used within a ${GlobalShortagesContextProvider.name}.`
    );
  }

  return context;
};
