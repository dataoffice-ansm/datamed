import { Footer } from '../Footer';
import React from 'react';
import { NavigationBar } from '../NavBar/NavigationBar';

import { useLayoutContext } from '../../contexts/layoutContext';
import { useBodyScrollContext } from '../../contexts/bodyScrollContext';

/**
 *
 * @param children
 * @constructor
 */
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { navBarHeight } = useLayoutContext();
  const { scrollEnabled } = useBodyScrollContext();

  return (
    <>
      <NavigationBar />
      <main
        className="ease-linear transition-padding duration-200"
        style={{ paddingTop: navBarHeight }}
      >
        <div className="max-md:px-3 md:container max-w-full md:mx-auto">{children}</div>
      </main>
      <Footer />
      {!scrollEnabled && (
        <div className="overlay bg-overlay fixed top-0 left-0 right-0 bottom-0 z-[1]" />
      )}
    </>
  );
};
