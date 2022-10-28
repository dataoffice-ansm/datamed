import { Footer } from './Footer';
import Logo from '../assets/images/logo-ansm-v2.svg';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav>
        <Logo aria-label="Website logo" height={100} width={200} />
      </nav>
      <main>{children}</main>
      <Footer />
    </>
  );
};
