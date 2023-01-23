import { Footer } from '../Footer';
import React from 'react';
import { NavigationBar } from '../Nav/NavigationBar';

import { useLayoutContext } from '../../contexts/LayoutContext';
import { useBodyScrollContext } from '../../contexts/BodyScrollContext';

const Overlay = () => {
  const { scrollEnabled } = useBodyScrollContext();

  return (
    <div>
      {!scrollEnabled && (
        <div className="overlay bg-overlay fixed top-0 left-0 right-0 bottom-0 z-[1]" />
      )}
    </div>
  );
};

/**
 *
 * @param children
 * @constructor
 */
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { authed, navBarHeight, stickyHeroHeight } = useLayoutContext();

  if (authed) {
    return (
      <>
        <NavigationBar />
        <main
          className="ease-linear transition-padding duration-200"
          style={{ paddingTop: navBarHeight + stickyHeroHeight }}
        >
          <div className="px-2 max-md:px-3 md:container max-w-[1920px] md:mx-auto">{children}</div>
        </main>
        <Footer />
        <Overlay />
      </>
    );
  }

  return null;
};
