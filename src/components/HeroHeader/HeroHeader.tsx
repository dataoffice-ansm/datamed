import type { HTMLAttributes, ReactNode } from 'react';
import SubSvg from '../../assets/pictos/sub.svg';
import { type Entity, useEntityContext } from '../../contexts/EntityContext';
import { HeadlessHeroHeader } from './HeadlessHeroHeader';
import { getPharmaFormIcon } from '../../utils/iconsMapping';
import { type PharmaFormType } from '../../graphql/__generated__/generated-documents';

type EntityOptions = {
  theme: string;
  icon: ReactNode;
  type: 'Substance' | 'Spécialité';
};

const getEntityTypeParams = (entity: Entity): EntityOptions => {
  if (entity.type === 'sub') {
    return {
      theme: 'bg-secondary-900',
      icon: <SubSvg />,
      type: 'Substance',
    };
  }

  const cisPharmaFormIcon = getPharmaFormIcon(entity.pharmaForm?.type as PharmaFormType);

  return {
    theme: 'bg-primary',
    icon: cisPharmaFormIcon,
    type: 'Spécialité',
  };
};

/**
 *
 * @param id
 * @constructor
 */
export const HeroHeader = ({ id }: HTMLAttributes<HTMLDivElement>) => {
  const { currentEntity } = useEntityContext();
  const { theme, icon, type } = getEntityTypeParams(currentEntity);

  return (
    <HeadlessHeroHeader
      id={id}
      theme={theme}
      title={currentEntity.name}
      backNavigationLabel={`${type}: ${currentEntity.name}`}
      icon={icon}
    />
  );
};
