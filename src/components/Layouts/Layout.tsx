import { Footer } from '../Footer';
import React from 'react';
import { NavigationBar } from '../Navigation/NavigationBar';

/**
 *
 * @param children
 * @constructor
 */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line no-warning-comments
  // TODO: en attente du context sur la headerHeight
  const headerHeight = 100;

  return (
    <>
      <NavigationBar />
      <main style={{ paddingTop: `${headerHeight}px` }}>
        <div className="max-md:px-3 md:container max-w-full md:mx-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
};
