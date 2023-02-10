import type { Context, HTMLAttributes } from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { GlobalStatistics } from '../graphql/__generated__/generated-documents';

type GlobalStatisticsContextData = {
  globalStatistics: GlobalStatistics;
};

export const GlobalStatisticsPageContext = createContext<GlobalStatistics>({
  exposition: {},
  repartitionPerSeriousEffect: {},
  repartitionPerGravity: {},
  repartitionPerGender: {},
  repartitionPerNotifier: {},
  repartitionPerPathology: {},
  repartitionPerAge: {},
} as GlobalStatistics);

/**
 *
 * @param entity
 * @param children
 * @constructor
 */
export const GlobalDecPageContextProvider = ({
  globalStatistics,
  children,
}: HTMLAttributes<HTMLDivElement> & GlobalStatisticsContextData) => {
  const value = useMemo(
    () => ({
      ...globalStatistics,
    }),
    [globalStatistics]
  );
  return (
    <GlobalStatisticsPageContext.Provider value={value}>
      {children}
    </GlobalStatisticsPageContext.Provider>
  );
};

export const useGlobalDecPageContext = () => {
  const context = useContext<GlobalStatistics>(
    GlobalStatisticsPageContext as unknown as Context<GlobalStatistics>
  );

  if (!context) {
    throw new Error(
      `${GlobalDecPageContextProvider.name} must be used within a ${GlobalDecPageContextProvider.name}.`
    );
  }

  return context;
};
