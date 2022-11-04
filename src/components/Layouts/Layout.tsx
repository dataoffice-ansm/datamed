import { Footer } from '../Footer';
import React from 'react';
import { NavigationBar } from '../Navigation/NavigationBar';

import { useNavigationBarHeightContext } from '../../contexts/NavigationBarHeightContext';
import { useBodyScrollContext } from '../../contexts/BodyScrollContext';

/**
 *
 * @param children
 * @constructor
 */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { height: navigationBarHeight } = useNavigationBarHeightContext();
  const { scrollEnabled } = useBodyScrollContext();

  return (
    <>
      <NavigationBar />
      <main
        className="ease-linear transition-padding duration-200"
        style={{ paddingTop: `${navigationBarHeight}px` }}
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
