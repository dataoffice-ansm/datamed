import { Footer } from './Footer';
import Logo from '../assets/images/logo-ansm-v2.svg';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

/**
 *
 * @param children
 * @constructor
 */
export const Layout = ({ children }: LayoutProps) => (
  <>
    <nav>
      <Logo aria-label="Website logo" height={100} width={200} />
    </nav>
    <main>{children}</main>
    <Footer />
  </>
);
