import { useState, useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { NavigationDrawerMobile } from './NavigationDrawerMobile';
import { NavigationLink } from './NavigationLink';
import { SearchBar } from './SearchBar';
import LogoBrand from '../../icons/logo.svg';
import MenuIcon from '../../icons/menu.svg';
import CloseIcon from '../../icons/close.svg';
import type { NavLinkItem } from '../../config/config';
import { navIconSize } from '../../config/config';
import { useBreakpoint } from '../../hooks/useTailwindBreakpoint';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useRefHeight } from '../../hooks/useRefHeight';
import { useNavigationBarHeightContext } from '../../contexts/NavigationBarHeightContext';
import { useBodyScrollContext } from '../../contexts/BodyScrollContext';

const links: NavLinkItem[] = [
  {
    text: 'FAQ',
    href: '/faq',
  },
  {
    text: 'A propos',
    href: '/a-propos',
  },
];

export const NavigationBar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navbarHeight = useRefHeight(navbarRef);
  const { scrollY } = useScrollPosition();
  const isDesktop = useBreakpoint('md');
  const { setHeight } = useNavigationBarHeightContext();
  const { setScrollEnabled } = useBodyScrollContext();

  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const pageScrolled = scrollY > navbarHeight;

  useEffect(() => {
    setHeight(navbarHeight);
  }, [navbarHeight, setHeight]);

  /**
   * @name toggleSidePanel
   * @return void
   * @description
   * Handle user interaction with the burger icon menu.
   * - Update opened property for navigation menu state
   * - Update responsive state for retrieve state on window resize
   */
  const toggleSidePanel = useCallback(() => {
    setMobileMenuOpened((v) => !v);
  }, []);

  useEffect(() => {
    if (mobileMenuOpened) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  }, [mobileMenuOpened, setScrollEnabled]);

  useEffect(() => {
    if (isDesktop) {
      setMobileMenuOpened(false);
    }
  }, [isDesktop]);

  return (
    <>
      <nav
        ref={navbarRef}
        className={classnames(
          'navbar',
          'flex justify-between items-center gap-4',
          'z-[2] fixed p-4 md:p-6 left-0 right-0 bg-white top-0',
          'ease-in-out duration-200 transition-padding',
          pageScrolled && 'py-2 md:py-3 shadow'
        )}
      >
        <button
          aria-label={mobileMenuOpened ? 'Fermer menu' : 'Ouvrir menu'}
          type="button"
          className={classnames('flex justify-center align-center p-2', isDesktop && 'hidden')}
          onClick={toggleSidePanel}
        >
          {mobileMenuOpened ? (
            <CloseIcon height={navIconSize} width={navIconSize} />
          ) : (
            <MenuIcon height={navIconSize} width={navIconSize} />
          )}
        </button>

        <div className="flex justify-center md:justify-between items-center gap-8">
          <Link href="/">
            <a className="flex justify-center items-center border-b-4 border-transparent">
              <LogoBrand width={128} height={32} alt="Logo DATAMED" />
            </a>
          </Link>
          {links.map((link) => (
            <NavigationLink
              key={link.href}
              enableAnimation
              className="hidden md:block"
              href={link.href}
            >
              {link.text}
            </NavigationLink>
          ))}
        </div>
        <span className="hidden md:block flex-auto" />
        <SearchBar />
      </nav>

      {mobileMenuOpened && (
        <NavigationDrawerMobile
          links={links}
          toggleOverlay={toggleSidePanel}
          topFromNavbar={navbarHeight}
        />
      )}
    </>
  );
};
