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
  description: string;
};

const getEntityTypeParams = (entity: Entity): EntityOptions => {
  if (entity.type === 'sub') {
    return {
      theme: 'bg-secondary-900',
      icon: <SubSvg />,
      type: 'Substance',
      description: 'Substance active',
    };
  }

  const cisPharmaFormIcon = getPharmaFormIcon(entity.pharmaForm?.type as PharmaFormType);

  return {
    theme: 'bg-primary',
    icon: cisPharmaFormIcon,
    type: 'Spécialité',
    description: 'Spécialité pharmaceutique',
  };
};

/**
 *
 * @param id
 * @constructor
 */
export const HeroHeader = ({ id }: HTMLAttributes<HTMLDivElement>) => {
  const { currentEntity } = useEntityContext();
  const { description, theme, icon, type } = getEntityTypeParams(currentEntity);

  return (
    <HeadlessHeroHeader
      id={id}
      theme={theme}
      title={currentEntity.name}
      backNavigationLabel={`${type}: ${currentEntity.name}`}
      description={description}
      icon={icon}
    />
  );
};
