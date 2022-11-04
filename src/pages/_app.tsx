import '../styles/index.scss';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';

import { Layout } from '../components/Layouts/Layout';
import { BodyScrollProvider } from '../contexts/bodyScrollContext';
import { NavBarProvider } from '../contexts/navBarContext';

export type NextPageWithLayout<P = Record<string, unknown>, Ip = P> = NextPage<P, Ip> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => (
  <SWRConfig>
    <BodyScrollProvider>
      <NavBarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NavBarProvider>
    </BodyScrollProvider>
  </SWRConfig>
);

export default MyApp;
