import type { HTMLAttributes } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import classnames from 'classnames';
import { defaultStickyHeroHeight, useLayoutContext } from '../../contexts/layoutContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useRefHeight } from '../../hooks/useRefHeight';
import { FullWidthRow } from '../FullWidthRow/FullWidthRow';
import { CisTooltip } from '../../componentsPages/Speciality/CisTooltip';
import { SubTooltip } from '../../componentsPages/Substance/SubTooltip';
import SubSvg from '../../assets/icons/sub.svg';
import CisSvg from '../../assets/icons/cis.svg';

const headerByCategory = {
  sub: {
    tooltip: <SubTooltip />,
    description: 'Substance active',
    title: 'Parachlorophénol',
    theme: 'bg-secondary',
    icon: <SubSvg className="h-fit" />,
  },
  cis: {
    tooltip: <CisTooltip />,
    description: 'Substance active',
    title: 'Parachlorophénol',
    theme: 'bg-primary',
    icon: <CisSvg className="h-fit" />,
  },
};

/**
 * @param icon ReactNode
 * - For example `<HeroSticky icon={<MySVG className="h-fit" />} />`
 */
export const HeroHeader = ({
  category,
}: HTMLAttributes<HTMLDivElement> & { category: 'sub' | 'cis' }) => {
  const { navBarHeight, setStickyHeroHeight } = useLayoutContext();
  const { scrollY } = useScrollPosition();
  const ref = useRef<HTMLDivElement>(null);
  const heightRef = useRefHeight(ref);
  const pageScrolled = heightRef && scrollY > heightRef;

  useEffect(() => {
    setStickyHeroHeight(pageScrolled ? defaultStickyHeroHeight : 0);
  }, [heightRef, pageScrolled, setStickyHeroHeight]);

  return (
    <FullWidthRow className={headerByCategory[category].theme}>
      <div
        className={classnames(
          'HeroHeader HeroHeaderSticky h-16 fixed left-0 right-0 z-[1] ease-in-out duration-500 transition-all',
          'text-white',
          headerByCategory[category].theme
        )}
        style={{
          top: heightRef && pageScrolled ? `${navBarHeight}px` : `-${navBarHeight}px`,
        }}
      >
        <div className="max-md:px-3 md:container max-w-full md:mx-auto flex gap-8 h-full items-center text-xl">
          <div className="w-11 h-11">{headerByCategory[category].icon}</div>
          <div className="text-2xl font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {headerByCategory[category].title}
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className="HeroHeader text-white pt-24 md:pt-48 pb-16 md:pb-24 gap-16 flex flex-col md:flex-row max-w-4xl"
      >
        <div className="w-24 h-24 md:w-36 md:h-36">{headerByCategory[category].icon}</div>
        <div>
          <div className="text-3xl font-medium mb-4">{headerByCategory[category].title}</div>
          <div className="text-xl mb-8">{headerByCategory[category].description}</div>
          {headerByCategory[category].tooltip}
        </div>
      </div>
    </FullWidthRow>
  );
};
