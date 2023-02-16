import { useRef, useEffect, useState, useCallback } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { NavDrawerMobile } from './NavDrawerMobile';
import LogoBrand from '../../assets/logo-ansm-beta.svg';
import { useRefHeight } from '../../hooks/useRefHeight';
import { useLayoutContext } from '../../contexts/LayoutContext';
import { SearchBar } from '../SearchBar';
import { useBreakpoint } from '../../hooks/useTailwindBreakpoint';
import MenuIcon from '../../assets/nav/menu.svg';
import CloseIcon from '../../assets/nav/close.svg';
import { useBodyScrollContext } from '../../contexts/BodyScrollContext';
import { navBarLinks } from '../../config/layoutConfig';
import { RenderNavLinks } from '../../utils/nav';
import { useClickOutsideRef } from '../../hooks/useRefClickOutside';
import { AutocompleteSearch } from '../AutocompleteSearch';

export const NavigationBar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navbarSearchRef = useRef<HTMLDivElement>(null);

  const [navDrawerOpened, setNavDrawerOpened] = useState(false);
  const [searchDrawerOpened, setSearchDrawerOpened] = useState(false);

  const navBarRefHeight = useRefHeight(navbarRef);
  const { navBarHeight, setNavBarHeight } = useLayoutContext();
  const { setScrollEnabled } = useBodyScrollContext();

  const isDesktop = useBreakpoint('md');

  const handleCloseDrawers = useCallback(() => {
    setNavDrawerOpened(false);
    setSearchDrawerOpened(false);
  }, []);

  const toggleOpenNavDrawer = useCallback(() => {
    setNavDrawerOpened((v) => !v);
    setSearchDrawerOpened(false);
  }, []);

  const toggleOpenSearchDrawer = useCallback(() => {
    setSearchDrawerOpened((v) => !v);
    setNavDrawerOpened(false);
  }, []);

  useClickOutsideRef(navbarSearchRef, handleCloseDrawers);

  useEffect(() => {
    setScrollEnabled(!(navDrawerOpened || searchDrawerOpened));
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
      className="navbar z-[2] fixed flex items-center left-0 right-0 top-0 w-full h-16 bg-white shadow"
    >
      <div
        className={classnames(
          'navbarInner container max-w-[1920px]',
          'flex justify-between items-center gap-4',
          'ease-in-out duration-200 transition-padding px-2'
        )}
      >
        <button
          aria-label={navDrawerOpened ? 'Fermer menu' : 'Ouvrir menu'}
          type="button"
          className="flex justify-center align-center p-2 md:hidden"
          onClick={toggleOpenNavDrawer}
        >
          {navDrawerOpened ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
        </button>

        {navDrawerOpened && (
          <NavDrawerMobile
            links={navBarLinks}
            topFromNavbar={navBarHeight}
            handleOnClick={handleCloseDrawers}
          />
        )}

        <div className="navbarInner flex justify-center md:justify-between items-center gap-3">
          <Link href="/">
            <a className="flex justify-center items-center border-b-4 border-transparent">
              <LogoBrand className="w-[128px] h-[46px]" alt="Logo DATAMED" />
            </a>
          </Link>
          <RenderNavLinks links={navBarLinks} />
        </div>
        <span className="hidden md:block flex-auto" />

        <SearchBar handleSearchDrawer={toggleOpenSearchDrawer} />
        {searchDrawerOpened && (
          <div
            ref={navbarSearchRef}
            className="AutocompleteMobileContainer fixed left-0 right-0 z-[3] overflow-auto"
            style={{ top: navBarHeight }}
          >
            <div className="AutocompleteMobileContent flex flex-col justify-center align-center bg-white border-t border-grey-100">
              <AutocompleteSearch embedded autoFocus handleOnSelected={toggleOpenSearchDrawer} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
