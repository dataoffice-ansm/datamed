import '../styles/index.scss';
import type { AppProps } from 'next/app';
import React from 'react';

import { AppLayout } from '../components/Layouts/AppLayout';
import { BodyScrollProvider } from '../contexts/BodyScrollContext';
import { LayoutProvider } from '../contexts/LayoutContext';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import useApollo, { APOLLO_STATE_PROPERTY_NAME } from '../config/apolloClient';
import { Router } from 'next/router';

export type AppCustomProps<PP extends Record<string, unknown> = Record<string, unknown>> = {
  pageProps: PP;
} & AppProps;

const LoadingContainer = () => (
  <div className="h-screen opacity-30 flex justify-center items-center">
    <h1>Chargement des données en cours</h1>
  </div>
);

const MyApp = ({ Component, pageProps }: AppCustomProps) => {
  const apolloClient = useApollo(pageProps[APOLLO_STATE_PROPERTY_NAME] as NormalizedCacheObject);

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <BodyScrollProvider>
        <LayoutProvider>
          <AppLayout>{loading ? <LoadingContainer /> : <Component {...pageProps} />} </AppLayout>
        </LayoutProvider>
      </BodyScrollProvider>
    </ApolloProvider>
  );
};

export default MyApp;
