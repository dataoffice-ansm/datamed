import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { config } from './config';
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
    // const headers = {
    //   ...context?.req.headers,
    //   // authorization: token ? `Bearer ${token}` : '',
    // };

    return createHttpLink({
      uri: config.serverApiGraphRoute,
      credentials: 'same-origin',
      // headers,
    });
  }

  return createHttpLink({
    uri: config.serverApiGraphRoute,
    credentials: 'same-origin',
  });
};

const createApolloClient = (context?: GetServerSidePropsContext) =>
  new ApolloClient<NormalizedCacheObject>({
    link: createApolloLink(context),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache({
      typePolicies: {
        Speciality: {
          keyFields: ['code'],
        },
        Substance: {
          keyFields: ['code'],
        },
      },
    }),
  });

export const initializeApolloClient = ({ initialCache, context }: Props) => {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialCache) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialCache });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export default function useApollo(initialCache?: NormalizedCacheObject) {
  return useMemo(() => initializeApolloClient({ initialCache }), [initialCache]);
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: PageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}
