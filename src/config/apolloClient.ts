import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';
import type { GetServerSidePropsContext } from 'next';
import type { IncomingMessage } from 'http';
// import cookie from 'cookie';

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';
export const COOKIES_TOKEN_NAME = 'jwt';

type PageProps = {
  props?: Record<string, unknown>;
};

type Props = {
  initialCache?: NormalizedCacheObject;
  context?: GetServerSidePropsContext;
};

let apolloClient: ApolloClient<NormalizedCacheObject>;

// const getToken = (req?: IncomingMessage) => {
//   const parsedCookie = cookie.parse(req ? req.headers.cookie ?? '' : document.cookie);
//   return parsedCookie[COOKIES_TOKEN_NAME];
// };

const createApolloLink = (context?: GetServerSidePropsContext) => {
  if (context) {
    // const token = getToken(context?.req);
    return createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
      credentials: 'same-origin',
      headers: {
        ...context?.req.headers,
        // authorization: token ? `Bearer ${token}` : '',
      },
    });
  }

  return createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'same-origin',
  });
};

export const initializeApolloClient = ({ initialCache, context }: Props) => {
  if (apolloClient) {
    if (initialCache) {
      apolloClient.cache.restore(initialCache);
    }

    return apolloClient;
  }

  apolloClient = new ApolloClient<NormalizedCacheObject>({
    link: createApolloLink(context),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache({
      typePolicies: {
        Speciality: {
          keyFields: ['cisId'],
        },
        Substance: {
          keyFields: ['code'],
        },
      },
    }),
  });

  if (initialCache) {
    apolloClient.cache.restore(initialCache);
  }

  return apolloClient;
};

export default function useApollo({ initialCache }: Props) {
  return useMemo(() => initializeApolloClient({ initialCache }), [initialCache]);
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: PageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}
