import type { GetServerSidePropsContext } from 'next';
import { addApolloState, initializeApolloClient } from '../config/apolloClient';
import { GlobalStatisticPage } from '../componentsPages/GlobalStatistic/GlobalStatisticPage';
import type {
  GlobalStatisticQuery,
  GlobalStatisticQueryVariables,
  GlobalStatistics,
} from '../graphql/__generated__/generated-documents';
import { GlobalStatisticDocument } from '../graphql/__generated__/generated-documents';
import { GlobalDecPageContextProvider } from '../contexts/GlobaleDecPageContext';
import toast from 'react-hot-toast';

type GlobalStatisticsPageProps = {
  globalStatistics: GlobalStatistics;
  err?: string;
};

const PageGlobalStatisticServerSideRendered = ({
  globalStatistics,
  err,
}: GlobalStatisticsPageProps) => {
  if (err) {
    toast.error(err);
  }

  return (
    <GlobalDecPageContextProvider globalStatistics={globalStatistics}>
      <GlobalStatisticPage />
    </GlobalDecPageContextProvider>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });

  try {
    const { data } = await apolloClient.query<GlobalStatisticQuery, GlobalStatisticQueryVariables>({
      query: GlobalStatisticDocument,
    });

    return addApolloState(apolloClient, {
      props: {
        globalStatistics: data.getGlobalStatistics ?? null,
      },
    });
  } catch (err: unknown) {
    console.log('Failed to fetch Global Stats page');
    console.log(err);

    return {
      props: {
        err: err instanceof Error ? err.message : err,
      },
    };
  }
};

export default PageGlobalStatisticServerSideRendered;
