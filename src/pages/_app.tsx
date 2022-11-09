import '../styles/index.scss';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';

import { AppLayout } from '../components/Layouts/AppLayout';
import { BodyScrollProvider } from '../contexts/BodyScrollContext';
import { LayoutProvider } from '../contexts/LayoutContext';

export type NextPageWithLayout<P = Record<string, unknown>, Ip = P> = NextPage<P, Ip> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => (
  <SWRConfig>
    <BodyScrollProvider>
      <LayoutProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </LayoutProvider>
    </BodyScrollProvider>
  </SWRConfig>
);

export default MyApp;
