import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import classnames from 'classnames';
import { stickyHeroHeightPx, useLayoutContext } from '../../contexts/LayoutContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useRefHeight } from '../../hooks/useRefHeight';
import SubSvg from '../../assets/icons/sub.svg';
import CisSvg from '../../assets/icons/cis.svg';
import GlobStatSvg from '../../assets/images/sick_transparent_person.svg';
import { FullWidthRow } from '../FullWidthRow/FullWidthRow';
import { CisTooltip } from '../../componentsPages/Speciality/CisTooltip';
import { SubTooltip } from '../../componentsPages/Substance/SubTooltip';
import { useEntityContext } from '../../contexts/EntityContext';
import BackArrowSVG from '../../assets/icons/back-arrow.svg';
import Link from 'next/link';
import { GlobStatTooltip } from '../../componentsPages/GlobalStatistic/GlobStatTooltip';

type EntityOptions = {
  tooltip: ReactNode;
  theme: string;
  icon: ReactNode;
  type: 'Substance' | 'Spécialité' | 'Statistiques';
  description: string;
};

const entitiesOptionsMapping: Record<'sub' | 'cis' | 'globStat', EntityOptions> = {
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
  globStat: {
    tooltip: <GlobStatTooltip />,
    theme: 'bg-secondary-variant',
    icon: <GlobStatSvg />,
    type: 'Statistiques',
    description: 'Déclarations d’effets indésirables suspectés',
  },
};

/**
 *
 * @param id
 * @constructor
 */
export const HeroHeader = ({ id }: HTMLAttributes<HTMLDivElement>) => {
  const { navBarHeight, setStickyHeroHeight } = useLayoutContext();
  const { scrollY } = useScrollPosition();
  const { currentEntity } = useEntityContext();
  const ref = useRef<HTMLDivElement>(null);
  const heightRef = useRefHeight(ref);

  const pageScrolled = heightRef && scrollY >= heightRef;
  const { description, theme, icon, type } = entitiesOptionsMapping[currentEntity.type];

  useEffect(() => {
    setStickyHeroHeight(pageScrolled ? stickyHeroHeightPx : 0);
  }, [heightRef, pageScrolled, setStickyHeroHeight]);

  return (
    <FullWidthRow id={id} className={theme}>
      <div
        className={classnames(
          'HeroHeader HeroHeaderSticky h-16 fixed left-0 right-0 z-[1]',
          'ease-in-out duration-500 transition-all',
          'text-white',
          theme
        )}
        style={{
          top: heightRef && pageScrolled ? `${navBarHeight}px` : `-${navBarHeight}px`,
        }}
      >
        <div className="max-md:px-3 md:container max-w-full md:mx-auto flex gap-8 h-full items-center text-xl">
          <div className="w-11 h-11">{icon}</div>
          <div className="text-2xl font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {/* eslint-disable-next-line no-negated-condition */}
            {currentEntity.type !== 'globStat' ? currentEntity.name : ''}
          </div>
        </div>
      </div>
      <div ref={ref} className="flex flex-col">
        {currentEntity.type !== 'globStat' && (
          <Link href="/">
            <a className="flex justify-center items-center text-white my-12 gap-4">
              <div className="h-8 w-8">
                <BackArrowSVG className="h-8 w-8" />
              </div>

              <div className="text-xl font-medium">
                Accueil / {type}: {currentEntity.name}
              </div>
            </a>
          </Link>
        )}
        <div className="HeroHeader flex flex-col md:flex-row min-h[20rem] max-w-4xl pt-24 md:pt-48 pb-16 md:pb-24 lg:pb-32 gap-16 text-white">
          <div className="w-24 h-24 md:w-36 md:h-36">{icon}</div>
          <div className="flex flex-col justify-center">
            <div className="text-3xl font-medium mb-4">
              {/* eslint-disable-next-line no-negated-condition */}
              {currentEntity.type !== 'globStat' ? currentEntity.name : ''}
            </div>
            <div className="text-2xl mb-4">{description}</div>
          </div>
        </div>
      </div>
    </FullWidthRow>
  );
};
