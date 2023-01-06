import '../styles/index.scss';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import { AppLayout } from '../components/Layouts/AppLayout';
import { BodyScrollProvider } from '../contexts/BodyScrollContext';
import { LayoutProvider } from '../contexts/LayoutContext';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import useApollo, { APOLLO_STATE_PROPERTY_NAME } from '../config/apolloClient';
import { Router } from 'next/router';
import { AuthModal } from '../auth/AuthModal';
import jwt from 'jsonwebtoken';
import App from 'next/app';
import { config } from '../config/config';
import Head from 'next/head';

export type AppCustomProps<PP extends Record<string, unknown> = Record<string, unknown>> = {
  pageProps: PP;
  authed: boolean;
} & AppProps;

const LoadingContainer = () => (
  <div className="h-screen opacity-30 flex justify-center items-center">
    <h1>Chargement des données en cours</h1>
  </div>
);

const MyApp = ({ Component, authed, pageProps }: AppCustomProps) => {
  const apolloClient = useApollo(pageProps[APOLLO_STATE_PROPERTY_NAME] as NormalizedCacheObject);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <BodyScrollProvider>
          <LayoutProvider authSSR={authed}>
            <AuthModal />
            <AppLayout>{loading ? <LoadingContainer /> : <Component {...pageProps} />} </AppLayout>
          </LayoutProvider>
        </BodyScrollProvider>
      </ApolloProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const ctx = await App.getInitialProps(appContext);
  const token = appContext?.ctx?.req?.cookies?.[config.tokenName] as string;

  if (!token || !config?.ssr?.jwtToken) {
    return {
      ...ctx,
      authed: false,
    };
  }

  try {
    const data = jwt.verify(token, config?.ssr?.jwtToken);
    if (data)
      return {
        ...ctx,
        authed: true,
      };

    return {
      ...ctx,
      authed: false,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      ...ctx,
      authed: false,
    };
  }
};

export default MyApp;
