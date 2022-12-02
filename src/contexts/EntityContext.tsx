import type { Context, Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { useEffect } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type { Speciality, Substance } from '../graphql/__generated__/generated-documents';

export type EntityCis = Speciality & { type: 'cis' };
export type EntitySub = Substance & { type: 'sub' };
export type Entity = EntityCis | EntitySub;

type EntityContextData<T extends Entity> = {
  currentEntity: T;
  setCurrentEntity: Dispatch<SetStateAction<T>>;
};

export const EntityContext = createContext<EntityContextData<EntityCis | EntitySub>>({
  currentEntity: { type: 'cis', name: 'default', id: 44, cisId: '44444' },
  setCurrentEntity: () => null,
});

/**
 *
 * @param entity
 * @param children
 * @constructor
 */
export const EntityContextProvider = ({
  entity,
  children,
}: HTMLAttributes<HTMLDivElement> & { entity: Entity }) => {
  const [currentEntity, setCurrentEntity] = useState<Entity>(entity);

  useEffect(() => {
    setCurrentEntity(entity);
  }, [entity]);

  const value = useMemo(
    () => ({
      currentEntity,
      setCurrentEntity,
    }),
    [currentEntity]
  );

  return <EntityContext.Provider value={value}>{children}</EntityContext.Provider>;
};

export const useEntityContext = <T extends Entity = Entity>() => {
  const context = useContext<EntityContextData<T>>(
    EntityContext as unknown as Context<EntityContextData<T>>
  );

  if (!context) {
    throw new Error(
      `${EntityContextProvider.name} must be used within a ${EntityContextProvider.name}.`
    );
  }

  return context;
};
