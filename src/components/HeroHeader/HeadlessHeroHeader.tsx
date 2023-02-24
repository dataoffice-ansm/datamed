import type { HTMLAttributes, ReactNode } from 'react';
import { useRef } from 'react';
import classnames from 'classnames';
import { stickyHeroHeightPx, useLayoutContext } from '../../contexts/LayoutContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useRefHeight } from '../../hooks/useRefHeight';
import { FullWidthRow } from '../FullWidthRow';
import BackArrowSVG from '../../assets/pictos/icons/back-arrow.svg';
import Link from 'next/link';
import classNames from 'classnames';

export type HeadlessHeroHeaderProps = {
  theme: string;
  icon: JSX.Element | ReactNode;
  title: string;
  textColor?: string;
  backNavigationLabel: string;
  backNavigationIconColor?: string;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 * @param id
 * @param icon
 * @param theme
 * @param title
 * @param backNavigationLabel
 * @param textColor
 * @param backNavigationColor
 * @constructor
 */
export const HeadlessHeroHeader = ({
  id,
  icon,
  theme,
  title,
  backNavigationLabel,
  textColor = 'text-white',
  backNavigationIconColor: backNavigationColor = 'fill-white',
}: HeadlessHeroHeaderProps) => {
  const { navBarHeight } = useLayoutContext();
  const { scrollY } = useScrollPosition();
  const ref = useRef<HTMLDivElement>(null);
  const heightRef = useRefHeight(ref);
  const pageScrolled = heightRef && scrollY + stickyHeroHeightPx >= heightRef;

  return (
    <FullWidthRow id={id} className={theme}>
      <div
        className={classnames(
          'HeadlessHeroHeaderSticky h-12 fixed left-0 right-0 z-[1]',
          'ease-in-out duration-500 transition-all',
          textColor,
          theme
        )}
        style={{
          top: heightRef && pageScrolled ? `${navBarHeight}px` : `-${navBarHeight}px`,
        }}
      >
        <div className="max-md:px-3 md:container max-w-[1920px] md:mx-auto flex gap-4 h-full items-center">
          <div className="w-10">{icon}</div>
          <span className="text-md sm:text-xl font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </span>
        </div>
      </div>
      <div ref={ref} className="HeadlessHeroHeader flex flex-col w-full">
        <Link href="/">
          <a
            className={classNames(
              'flex justify-start items-center mt-10 mt-4 md:mb-8 gap-4',
              textColor
            )}
          >
            <div className="h-8 w-8">
              <BackArrowSVG className={classNames('h-8 w-8', backNavigationColor)} />
            </div>
            <div className="text-md font-medium">Accueil / {backNavigationLabel}</div>
          </a>
        </Link>

      </div>
    </FullWidthRow>
  );
};
