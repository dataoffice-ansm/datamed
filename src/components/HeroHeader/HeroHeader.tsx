import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import classnames from 'classnames';
import { stickyHeroHeightPx, useLayoutContext } from '../../contexts/LayoutContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useRefHeight } from '../../hooks/useRefHeight';
import SubSvg from '../../assets/icons/sub.svg';
import CisSvg from '../../assets/icons/cis.svg';
import { FullWidthRow } from '../FullWidthRow/FullWidthRow';
import { CisTooltip } from '../../componentsPages/Speciality/CisTooltip';
import { SubTooltip } from '../../componentsPages/Substance/SubTooltip';
import { useEntityContext } from '../../contexts/EntityContext';

type EntityOptions = {
  tooltip: ReactNode;
  theme: string;
  icon: ReactNode;
};

const entitiesOptionsMapping: {
  sub: EntityOptions;
  cis: EntityOptions;
} = {
  sub: {
    tooltip: <SubTooltip />,
    theme: 'bg-secondary',
    icon: <SubSvg className="h-fit" />,
  },
  cis: {
    tooltip: <CisTooltip />,
    theme: 'bg-primary',
    icon: <CisSvg className="h-fit" />,
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
  const ref = useRef<HTMLDivElement>(null);
  const heightRef = useRefHeight(ref);
  const { currentCis } = useEntityContext();
  const pageScrolled = heightRef && scrollY >= heightRef;
  const entityType = currentCis ? 'cis' : 'sub';
  const { theme, icon, tooltip } = entitiesOptionsMapping[entityType];

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
            {currentCis?.name}
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className="HeroHeader flex flex-col md:flex-row min-h[20rem] max-w-4xl pt-24 md:pt-48 pb-16 md:pb-24 gap-16 text-white"
      >
        <div className="w-24 h-24 md:w-36 md:h-36">{icon}</div>
        <div>
          <div className="text-3xl font-medium mb-4">{currentCis?.name}</div>
          <div className="text-xl mb-8">
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </div>
          {tooltip}
        </div>
      </div>
    </FullWidthRow>
  );
};
