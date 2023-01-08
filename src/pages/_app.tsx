import '../styles/index.scss';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';

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
import { toastConfig } from '../utils/toasts';
import dynamic from 'next/dynamic';

const Toaster = dynamic(async () => import('react-hot-toast').then((c) => c.Toaster), {
  ssr: false,
});

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
  const [isLoading, setIsLoading] = useState(false);
  const apolloClient = useApollo(pageProps[APOLLO_STATE_PROPERTY_NAME] as NormalizedCacheObject);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
    return () => {
      Router.events.off('routeChangeStart', () => {
        setIsLoading(true);
      });
      Router.events.off('routeChangeComplete', () => {
        setIsLoading(false);
      });
      Router.events.off('routeChangeError', () => {
        setIsLoading(false);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <Toaster toastOptions={toastConfig} />
      <ApolloProvider client={apolloClient}>
        <BodyScrollProvider>
          <LayoutProvider authSSR={authed}>
            {/*<AuthModal />*/}
            <AppLayout>{isLoading ? <LoadingContainer /> : <Component {...pageProps} />}</AppLayout>
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
    const data = jwt.verify(token, config?.ssr?.jwtToken, { algorithms: ['none'] });
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
