import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import classnames from 'classnames';
import { stickyHeroHeightPx, useLayoutContext } from '../../contexts/LayoutContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useRefHeight } from '../../hooks/useRefHeight';
import { FullWidthRow } from '../FullWidthRow/FullWidthRow';
import BackArrowSVG from '../../assets/icons/back-arrow.svg';
import Link from 'next/link';
import classNames from 'classnames';

export type HeadlessHeroHeaderProps = {
  theme: string;
  icon: JSX.Element | ReactNode;
  title: string;
  description: string;
  textColor?: string;
  backNavigationLabel: string;
  backNavigationIconColor?: string;
  tooltip?: JSX.Element | ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 * @param id
 * @param icon
 * @param theme
 * @param title
 * @param backNavigationLabel
 * @param description
 * @param textColor
 * @param backNavigationColor
 * @param tooltip
 * @constructor
 */
export const HeadlessHeroHeader = ({
  id,
  icon,
  theme,
  title,
  backNavigationLabel,
  description,
  textColor = 'text-white',
  backNavigationIconColor: backNavigationColor = 'fill-white',
  tooltip,
}: HeadlessHeroHeaderProps) => {
  const { navBarHeight, setStickyHeroHeight } = useLayoutContext();
  const { scrollY } = useScrollPosition();
  const ref = useRef<HTMLDivElement>(null);
  const heightRef = useRefHeight(ref);
  const pageScrolled = heightRef && scrollY >= heightRef;

  useEffect(() => {
    setStickyHeroHeight(pageScrolled ? stickyHeroHeightPx : 0);
  }, [heightRef, pageScrolled, setStickyHeroHeight]);

  return (
    <FullWidthRow id={id} className={theme}>
      <div
        className={classnames(
          'HeadlessHeroHeaderSticky h-16 fixed left-0 right-0 z-[1]',
          'ease-in-out duration-500 transition-all',
          textColor,
          theme
        )}
        style={{
          top: heightRef && pageScrolled ? `${navBarHeight}px` : `-${navBarHeight}px`,
        }}
      >
        <div className="max-md:px-3 md:container max-w-[1920px] md:mx-auto flex gap-8 h-full items-center text-xl">
          <div className="w-11 h-11">{icon}</div>
          <div className="text-2xl font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </div>
        </div>
      </div>
      <div ref={ref} className="HeadlessHeroHeader flex flex-col w-full">
        <Link href="/">
          <a className={classNames('flex justify-start items-center my-12 gap-4', textColor)}>
            <div className="h-8 w-8">
              <BackArrowSVG className={classNames('h-8 w-8', backNavigationColor)} />
            </div>
            <div className="text-md font-medium">Accueil / {backNavigationLabel}</div>
          </a>
        </Link>
        <div
          className={classNames(
            'HeroHeader flex flex-col md:flex-row justify-center min-h[20rem] pt-24 md:pt-48 pb-16 md:pb-24 lg:pb-32 gap-16',
            textColor
          )}
        >
          <div className="w-24 h-24 md:w-36 md:h-36">{icon}</div>
          <div className="flex flex-col justify-center">
            <div className="text-3xl font-medium mb-4">{title}</div>
            {description && <div className="text-2xl mb-4">{description}</div>}
            {tooltip && <div className="text-lg mb-4">{tooltip}</div>}
          </div>
        </div>
      </div>
    </FullWidthRow>
  );
};
