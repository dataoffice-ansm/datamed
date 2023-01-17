import { useRef, useEffect, useState, useCallback } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { NavDrawerMobile } from './NavDrawerMobile';
import LogoBrand from '../../assets/logo-ansm-beta.svg';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useRefHeight } from '../../hooks/useRefHeight';
import { useLayoutContext } from '../../contexts/LayoutContext';
import { SearchBar } from '../SearchBar';
import { useBreakpoint } from '../../hooks/useTailwindBreakpoint';
import MenuIcon from '../../assets/nav/menu.svg';
import CloseIcon from '../../assets/nav/close.svg';
import { useBodyScrollContext } from '../../contexts/BodyScrollContext';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { navBarLinks, navIconSize } from '../../config/layoutConfig';
import { RenderNavLinks } from '../../utils/nav';

export const NavigationBar = () => {
  const [navDrawerOpened, setNavDrawerOpened] = useState(false);
  const [searchDrawerOpened, setSearchDrawerOpened] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const navBarRefHeight = useRefHeight(navbarRef);
  const { navBarHeight, setNavBarHeight } = useLayoutContext();
  const { setScrollEnabled } = useBodyScrollContext();
  const { scrollY } = useScrollPosition();
  const pageScrolled = scrollY > navBarHeight;

  const isDesktop = useBreakpoint('md');

  const toggleOpenNavDrawer = useCallback(() => {
    setNavDrawerOpened((v) => !v);
    setSearchDrawerOpened(false);
  }, []);

  const closeNavDrawer = useCallback(() => {
    console.log('sdfsef');
    setNavDrawerOpened(false);
    setSearchDrawerOpened(false);
  }, []);

  const handleSearchDrawer = useCallback(() => {
    setSearchDrawerOpened((v) => !v);
    setNavDrawerOpened(false);
  }, []);

  useEffect(() => {
    if (navDrawerOpened || searchDrawerOpened) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  }, [navDrawerOpened, searchDrawerOpened, setScrollEnabled]);

  useEffect(() => {
    if (isDesktop) {
      setNavDrawerOpened(false);
      setSearchDrawerOpened(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (navBarRefHeight) {
      setNavBarHeight(navBarRefHeight);
    }
  }, [navBarRefHeight, setNavBarHeight]);

  return (
    <nav
      ref={navbarRef}
      className={classnames(
        'navbar',
        'flex justify-between items-center gap-4',
        'z-[2] fixed px-6 left-0 right-0 bg-white top-0',
        'ease-in-out duration-200 transition-padding',
        {
          'h-20': !pageScrolled,
          'h-14 md:h-16 py-2 md:py-3 shadow': pageScrolled,
        }
      )}
    >
      <button
        aria-label={navDrawerOpened ? 'Fermer menu' : 'Ouvrir menu'}
        type="button"
        className="flex justify-center align-center p-2 md:hidden"
        onClick={toggleOpenNavDrawer}
      >
        {navDrawerOpened ? (
          <CloseIcon height={navIconSize} width={navIconSize} />
        ) : (
          <MenuIcon height={navIconSize} width={navIconSize} />
        )}
      </button>

      {navDrawerOpened && (
        <NavDrawerMobile
          links={navBarLinks}
          topFromNavbar={navBarHeight}
          handleOnClick={closeNavDrawer}
        />
      )}

      <div className="flex justify-center md:justify-between items-center gap-8">
        <Link href="/">
          <a className="flex justify-center items-center border-b-4 border-transparent">
            <LogoBrand width={128} height={46} alt="Logo DATAMED" />
          </a>
        </Link>
        <RenderNavLinks links={navBarLinks} />
      </div>
      <span className="hidden md:block flex-auto" />

      <SearchBar handleSearchDrawer={handleSearchDrawer} />
      {searchDrawerOpened && (
        <div
          style={{ top: navBarHeight }}
          className="AutocompleteMobileContainer fixed left-0 right-0 bottom-0 z-[3] overflow-auto"
        >
          <div className="AutocompleteMobileContent bg-white flex flex-col justify-center align-center">
            <Autocomplete embedded autoFocus handleOnSelected={handleSearchDrawer} />
          </div>
        </div>
      )}
    </nav>
  );
};
