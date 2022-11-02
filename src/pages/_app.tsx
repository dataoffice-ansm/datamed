import '../styles/index.scss';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { Layout } from '../components/Layouts/Layout';
import { BodyScrollProvider } from '../contexts/BodyScrollContext';
import { NavigationBarHeightProvider } from '../contexts/NavigationBarHeightContext';

export type NextPageWithLayout<P = Record<string, unknown>, Ip = P> = NextPage<P, Ip> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => (
  <BodyScrollProvider>
    <NavigationBarHeightProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NavigationBarHeightProvider>
  </BodyScrollProvider>
);

export default MyApp;
