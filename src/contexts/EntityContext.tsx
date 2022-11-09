import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type { Speciality, Substance } from '../api/interfaces/models';

export type CisType = Partial<Speciality> | null;

export const EntityContext = createContext<{
  // currentEntity: Speciality | Substance | null;
  // setCurrentEntity: Dispatch<SetStateAction<Speciality | Substance | null>>;

  currentCis: CisType;
  setCurrentCis: Dispatch<SetStateAction<CisType>>;

  // currentEntity: Speciality | Substance | null;
  // setCurrentEntity: Dispatch<SetStateAction<Speciality | Substance | null>>;
}>({
  currentCis: null,
  setCurrentCis: () => null,
  // currentEntity: null,
  // setCurrentEntity: () => null,
});

export const EntityProvider = ({
  cis,
  children,
}: HTMLAttributes<HTMLDivElement> & { cis: CisType }) => {
  // const [currentEntity, setCurrentEntity] = useState<Speciality | Substance | null>(null);
  const [currentCis, setCurrentCis] = useState<CisType>(cis);

  const value = useMemo(
    () => ({
      // currentEntity,
      // setCurrentEntity,
      currentCis,
      setCurrentCis,
    }),
    [currentCis, setCurrentCis]
  );

  return <EntityContext.Provider value={value}>{children}</EntityContext.Provider>;
};

export const useEntityContext = () => {
  const context = useContext(EntityContext);

  if (context === undefined) {
    throw new Error(`${EntityProvider.name} must be used within a ${EntityProvider.name}.`);
  }

  return context;
};
