import type { GetServerSidePropsContext } from 'next';
import { addApolloState, initializeApolloClient } from '../config/apolloClient';
import { GlobalRupturesDocument } from '../graphql/__generated__/generated-documents';
import type {
  GlobalRuptures,
  GlobalRupturesQuery,
  GlobalRupturesQueryVariables,
} from '../graphql/__generated__/generated-documents';
import { Ruptures } from '../componentsPages/Ruptures/Ruptures';
import { RupturesPageContextProvider } from '../contexts/RupturesPageContext';

const PageGlobalRupturesServerSideRendered = ({ ruptures }: { ruptures: GlobalRuptures }) => (
  <RupturesPageContextProvider ruptures={ruptures}>
    <Ruptures />
  </RupturesPageContextProvider>
);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });

  try {
    const { data } = await apolloClient.query<GlobalRupturesQuery, GlobalRupturesQueryVariables>({
      query: GlobalRupturesDocument,
    });

    return addApolloState(apolloClient, {
      props: {
        ruptures: data.getGlobalRuptures ?? null,
      },
    });
  } catch (err: unknown) {
    console.log(err);

    return addApolloState(apolloClient, {
      props: {},
    });
  }
};

export default PageGlobalRupturesServerSideRendered;
