import type { Context, HTMLAttributes } from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { GlobalStatistic } from '../graphql/__generated__/generated-documents';

type GlobalDecPageContextData = {
  globalDec: GlobalStatistic;
};

export const RupturesContext = createContext<GlobalDecPageContextData>({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  globalDec: {
    exposition: {},
    repartitionPerSeriousEffect: {},
    repartitionPerGravity: {},
    repartitionPerGender: {},
    repartitionPerNotifier: {},
    repartitionPerPathology: {},
    repartitionPerAge: {},
  } as GlobalStatistic,
});

/**
 *
 * @param entity
 * @param children
 * @constructor
 */
export const GlobalDecPageContextProvider = ({
  globalDec,
  children,
}: HTMLAttributes<HTMLDivElement> & GlobalDecPageContextData) => {
  const value = useMemo(
    () => ({
      globalDec,
    }),
    [globalDec]
  );

  return <RupturesContext.Provider value={value}>{children}</RupturesContext.Provider>;
};

export const useGlobalDecPageContext = () => {
  const context = useContext<GlobalDecPageContextData>(
    RupturesContext as unknown as Context<GlobalDecPageContextData>
  );

  if (!context) {
    throw new Error(
      `${GlobalDecPageContextProvider.name} must be used within a ${GlobalDecPageContextProvider.name}.`
    );
  }

  return context;
};
