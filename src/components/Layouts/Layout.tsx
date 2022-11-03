import { Footer } from '../Footer';
import React from 'react';
import { NavigationBar } from '../Navigation/NavigationBar';
import { useBodyScrollContext } from '../../hooks/useBodyScrollContext';

/**
 *
 * @param children
 * @constructor
 */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line no-warning-comments
  // TODO: en attente du context sur la headerHeight
  const headerHeight = 100;

  const { scrollEnabled } = useBodyScrollContext();

  return (
    <>
      <NavigationBar />
      <main style={{ paddingTop: `${headerHeight}px` }}>
        <div className="max-md:px-3 md:container max-w-full md:mx-auto">{children}</div>
      </main>
      <Footer />
      {!scrollEnabled && (
        <div className="overlay bg-overlay fixed top-0 left-0 right-0 bottom-0 z-[1]" />
      )}
    </>
  );
};
