import { useState, useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { NavigationMenu } from './NavigationMenu';
import { NavigationLink } from './NavigationLink';
import { SearchBar } from './SearchBar';
import {
  NavigationLinkItem,
  NAVIGATION_ICON_SIZE,
  THRESHOLD_WIDTH_BREAKPOINT_MD,
} from '../../models/navigation.model';
import LogoBrand from '../../icons/logo.svg';
import MenuIcon from '../../icons/menu.svg';
import CloseIcon from '../../icons/close.svg';
import { useElementHeight } from '../../hooks/useElementHeight.hook';
import { useWindowWidth } from '../../hooks/useWindowWidth.hook';

export const NavigationBar = () => {
  // To save last opening menu status
  const [keepSideMenuOpened, setKeepSideMenuOpened] = useState(false);
  const [stickyClass, setStickyClass] = useState('');
  const navbarRef = useRef<HTMLDivElement>(null);
  const navbarHeight = useElementHeight(navbarRef);
  const widthWindow = useWindowWidth();
  const sideMenuOpened = widthWindow < THRESHOLD_WIDTH_BREAKPOINT_MD && keepSideMenuOpened;

  /**
   * @name toggleSidePanel
   * @return void
   * @description
   * Handle user interaction with the burger icon menu.
   * - Update opened property for navigation menu state
   * - Update responsive state for retreive state on window resize
   */
  const toggleSidePanel = useCallback(() => {
    setKeepSideMenuOpened(!keepSideMenuOpened);
  }, [keepSideMenuOpened]);

  /**
   * @name handleScroll
   * @return void
   * @description
   * Handle scroll user interaction (applied only when responsive menu not active)
   * - Reduce padding of navigation bar when user scroll after the navigation bar height
   * - Get back the initial height when back top the top
   */
  const handleScroll = useCallback(() => {
    if (!sideMenuOpened) {
      const nextClass = window.scrollY > navbarHeight ? 'py-2 md:py-3 shadow' : '';
      if (nextClass !== stickyClass) {
        setStickyClass(nextClass);
      }
    }
  }, [navbarHeight, sideMenuOpened, stickyClass]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const ariaLabelMenu = sideMenuOpened ? 'Fermer menu' : 'Ouvrir menu';
  const navbarClassName = classnames(
    'z-[2] fixed p-4 md:p-8 left-0 right-0 bg-white top-0',
    'flex justify-between items-center gap-4',
    'ease-in-out duration-200 transition-padding',
    stickyClass
  );

  const links: NavigationLinkItem[] = [
    {
      text: 'FAQ',
      href: '/faq',
    },
    {
      text: 'A propos',
      href: '/a-propos',
    },
  ];

  return (
    <>
      <nav ref={navbarRef} className={navbarClassName}>
        <button
          aria-label={ariaLabelMenu}
          onClick={toggleSidePanel}
          type="button"
          className="md:hidden flex justify-center align-center p-2"
        >
          {sideMenuOpened ? (
            <CloseIcon height={NAVIGATION_ICON_SIZE} width={NAVIGATION_ICON_SIZE} />
          ) : (
            <MenuIcon height={NAVIGATION_ICON_SIZE} width={NAVIGATION_ICON_SIZE} />
          )}
        </button>
        <div className="flex justify-center md:justify-between items-center gap-8">
          <Link href="/">
            <a className="flex justify-center items-center border-b-4 border-transparent">
              <LogoBrand width={128} height={32} alt="Logo DATAMED" />
            </a>
          </Link>
          {links.map((link, index) => (
            <NavigationLink className="hidden md:block" key={index} href={link.href}>
              {link.text}
            </NavigationLink>
          ))}
        </div>
        <span className="hidden md:block flex-auto"></span>
        <SearchBar />
      </nav>
      <NavigationMenu
        links={links}
        toggleOverlay={toggleSidePanel}
        opened={sideMenuOpened}
        topFromNavbar={navbarHeight}
      />
    </>
  );
};
