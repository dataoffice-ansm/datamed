import type { Context, HTMLAttributes } from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { GlobalRuptures } from '../graphql/__generated__/generated-documents';

type RupturesContextData = {
  ruptures: GlobalRuptures;
};

export const RupturesContext = createContext<RupturesContextData>({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  ruptures: {} as GlobalRuptures,
});

/**
 *
 * @param entity
 * @param children
 * @constructor
 */
export const RupturesPageContextProvider = ({
  ruptures,
  children,
}: HTMLAttributes<HTMLDivElement> & RupturesContextData) => {
  const value = useMemo(
    () => ({
      ruptures,
    }),
    [ruptures]
  );

  return <RupturesContext.Provider value={value}>{children}</RupturesContext.Provider>;
};

export const useRupturesPageContext = () => {
  const context = useContext<RupturesContextData>(
    RupturesContext as unknown as Context<RupturesContextData>
  );

  if (!context) {
    throw new Error(
      `${RupturesPageContextProvider.name} must be used within a ${RupturesPageContextProvider.name}.`
    );
  }

  return context;
};
