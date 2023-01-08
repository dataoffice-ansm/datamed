import type { HTMLAttributes, ReactNode } from 'react';
import SubSvg from '../../assets/pictos/sub.svg';
import CisSvg from '../../assets/pictos/cis.svg';
import { CisTooltip } from '../../componentsPages/Speciality/CisTooltip';
import { SubTooltip } from '../../componentsPages/Substance/SubTooltip';
import { useEntityContext } from '../../contexts/EntityContext';
import { HeadlessHeroHeader } from './HeadlessHeroHeader';

type EntityOptions = {
  tooltip: ReactNode;
  theme: string;
  icon: ReactNode;
  type: 'Substance' | 'Spécialité';
  description: string;
};

const entitiesOptionsMapping: Record<'sub' | 'cis', EntityOptions> = {
  sub: {
    tooltip: <SubTooltip />,
    theme: 'bg-secondary-900',
    icon: <SubSvg />,
    type: 'Substance',
    description: 'Substance active',
  },
  cis: {
    tooltip: <CisTooltip />,
    theme: 'bg-primary',
    icon: <CisSvg />,
    type: 'Spécialité',
    description: 'Spécialité de médicament',
  },
};

/**
 *
 * @param id
 * @constructor
 */
export const HeroHeader = ({ id }: HTMLAttributes<HTMLDivElement>) => {
  const { currentEntity } = useEntityContext();
  const { description, theme, icon, type, tooltip } = entitiesOptionsMapping[currentEntity.type];

  return (
    <HeadlessHeroHeader
      id={id}
      theme={theme}
      title={currentEntity.name}
      backNavigationLabel={`${type}: ${currentEntity.name}`}
      description={description}
      icon={icon}
      tooltip={tooltip}
    />
  );
};
