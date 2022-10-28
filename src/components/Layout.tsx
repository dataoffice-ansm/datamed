import { Footer } from './Footer';
import React from 'react';
import { NavigationBar } from './Navigation/NavigationBar';

/**
 *
 * @param children
 * @constructor
 */
export const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <NavigationBar />
    <main>{children}</main>
    <Footer />
  </>
);
