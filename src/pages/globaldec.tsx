import type { GetServerSidePropsContext } from 'next';
import { addApolloState, initializeApolloClient } from '../config/apolloClient';
import { GlobalStatisticPage } from '../componentsPages/GlobalStatistic/GlobalStatisticPage';
import type {
  GlobalStatistic,
  GlobalStatisticQuery,
  GlobalStatisticQueryVariables,
} from '../graphql/__generated__/generated-documents';
import { GlobalStatisticDocument } from '../graphql/__generated__/generated-documents';
import { GlobalDecPageContextProvider } from '../contexts/GlobaleDecPageContext';

const PageGlobalStatisticServerSideRendered = ({ globalStat }: { globalStat: GlobalStatistic }) => (
  <GlobalDecPageContextProvider globalDec={globalStat}>
    <GlobalStatisticPage />
  </GlobalDecPageContextProvider>
);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });

  try {
    const { data } = await apolloClient.query<GlobalStatisticQuery, GlobalStatisticQueryVariables>({
      query: GlobalStatisticDocument,
    });

    return addApolloState(apolloClient, {
      props: {
        globalStat: data.getGlobalStatistic ?? null,
      },
    });
  } catch (err: unknown) {
    console.log(err);

    return addApolloState(apolloClient, {
      props: {},
    });
  }
};

export default PageGlobalStatisticServerSideRendered;
