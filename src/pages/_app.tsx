import '../styles/index.scss';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';

import { AppLayout } from '../components/Layouts/AppLayout';
import { BodyScrollProvider } from '../contexts/BodyScrollContext';
import { LayoutProvider } from '../contexts/LayoutContext';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../config/apolloClient';

export type NextPageWithLayout<P = Record<string, unknown>, Ip = P> = NextPage<P, Ip>;

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => (
  <ApolloProvider client={apolloClient}>
    <BodyScrollProvider>
      <LayoutProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </LayoutProvider>
    </BodyScrollProvider>
  </ApolloProvider>
);

export default MyApp;
