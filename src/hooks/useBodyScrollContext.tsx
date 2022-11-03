import { bodyScrollContext, BodyScrollProvider } from '../contexts/BodyScrollContext';
import { useContext } from 'react';

export const useBodyScrollContext = () => {
  const context = useContext(bodyScrollContext);

  if (context === undefined) {
    throw new Error(
      `${useBodyScrollContext.name} must be used within a ${BodyScrollProvider.name}.`
    );
  }

  return context;
};
