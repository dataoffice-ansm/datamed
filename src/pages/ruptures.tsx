import type { GetServerSidePropsContext } from 'next';
import { addApolloState, initializeApolloClient } from '../config/apolloClient';
import {
  GlobalRupturesDocument,
  type GlobalShortages,
} from '../graphql/__generated__/generated-documents';
import type {
  GlobalRupturesQuery,
  GlobalRupturesQueryVariables,
} from '../graphql/__generated__/generated-documents';
import { GlobalShortagesPage } from '../componentsPages/GlobalShortages/GlobalShortagesPage';
import { GlobalShortagesContextProvider } from '../contexts/GlobalShortagesContext';
import toast from 'react-hot-toast';
import { getServerSideErrors } from '../utils/errors';

type GlobalShortagesPageProps = {
  shortages: GlobalShortages;
  err?: string;
};

const PageGlobalRupturesServerSideRendered = ({ shortages, err }: GlobalShortagesPageProps) => {
  if (err) {
    toast.error(err);
  }

  return (
    <GlobalShortagesContextProvider shortages={shortages}>
      <GlobalShortagesPage />
    </GlobalShortagesContextProvider>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });

  try {
    const { data } = await apolloClient.query<GlobalRupturesQuery, GlobalRupturesQueryVariables>({
      query: GlobalRupturesDocument,
    });

    return addApolloState(apolloClient, {
      props: {
        shortages: data.getGlobalShortages ?? null,
      },
    });
  } catch (err: unknown) {
    console.log('Failed to fetch Global Shortages page');
    return getServerSideErrors(err);
  }
};

export default PageGlobalRupturesServerSideRendered;
