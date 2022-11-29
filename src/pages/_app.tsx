import '../styles/index.scss';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';

import { AppLayout } from '../components/Layouts/AppLayout';
import { BodyScrollProvider } from '../contexts/BodyScrollContext';
import { LayoutProvider } from '../contexts/LayoutContext';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import useApollo, { APOLLO_STATE_PROPERTY_NAME } from '../config/apolloClient';

export type NextPageWithLayout<P = Record<string, unknown>, Ip = P> = NextPage<P, Ip>;

export type AppCustomProps<PP extends Record<string, unknown> = Record<string, unknown>> = {
  pageProps: PP;
} & AppProps;

const MyApp = ({ Component, pageProps }: AppCustomProps) => {
  const apolloClient = useApollo({
    initialCache: pageProps[APOLLO_STATE_PROPERTY_NAME] as NormalizedCacheObject,
  });

  return (
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
};

export default MyApp;
