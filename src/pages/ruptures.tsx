import type { GetServerSidePropsContext } from 'next';
import { addApolloState, initializeApolloClient } from '../config/apolloClient';
import { GlobalRuptureDocument } from '../graphql/__generated__/generated-documents';
import type {
  GlobalRupture,
  GlobalRuptureQuery,
  GlobalRuptureQueryVariables,
} from '../graphql/__generated__/generated-documents';
import { Ruptures } from '../componentsPages/Ruptures/Ruptures';

const PageGlobalRupturesServerSideRendered = ({ ruptures }: { ruptures: GlobalRupture }) => (
  <Ruptures ruptures={ruptures} />
);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });

  try {
    const { data } = await apolloClient.query<GlobalRuptureQuery, GlobalRuptureQueryVariables>({
      query: GlobalRuptureDocument,
    });

    return addApolloState(apolloClient, {
      props: {
        ruptures: data.getGlobalRupture ?? null,
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
