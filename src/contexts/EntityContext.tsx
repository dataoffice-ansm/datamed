import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type { Entity } from '../api/interfaces/models';

export const EntityContext = createContext<{
  currentEntity: Entity;
  setCurrentEntity: Dispatch<SetStateAction<Entity>>;
}>({
  currentEntity: { type: 'sub', id: '', name: '' },
  setCurrentEntity: () => null,
});

export const EntityProvider = ({
  entity,
  children,
}: HTMLAttributes<HTMLDivElement> & { entity: Entity }) => {
  const [currentEntity, setCurrentEntity] = useState<Entity>(entity);

  const value = useMemo(
    () => ({
      currentEntity,
      setCurrentEntity,
    }),
    [currentEntity]
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
