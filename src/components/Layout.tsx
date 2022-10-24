import { Footer } from './Footer';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav></nav>
      <main>{children}</main>
      <Footer />
    </>
  );
};
