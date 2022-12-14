import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { config } from './config';
import { onError } from '@apollo/client/link/error';

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';

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
      uri: `${config.appRoute}/api/graphql`,
      credentials: 'same-origin',
      // headers,
    });
  }

  return createHttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  });
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });

  if (networkError) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`[Network error]: ${networkError}`);
  }
});

const createApolloClient = (context?: GetServerSidePropsContext) => {
  const httpLink = createApolloLink(context);
  return new ApolloClient<NormalizedCacheObject>({
    link: from([errorLink, httpLink]),
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
};

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
