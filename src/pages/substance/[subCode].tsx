import type { ParsedUrlQuery } from 'querystring';
import { SubstancePage } from 'componentsPages/Substance/SubstancePage';
import type {
  Substance,
  SubstanceQuery,
  SubstanceQueryVariables,
} from '../../graphql/__generated__/generated-documents';
import { SubstanceDocument } from '../../graphql/__generated__/generated-documents';
import type { GetServerSidePropsContext } from 'next';
import { addApolloState, initializeApolloClient } from '../../config/apolloClient';

type SubSSRPageProps = {
  sub: Substance;
};

type ContextParams = {
  subCode: string;
} & ParsedUrlQuery;

const PageSubServerSideRendered = ({ sub }: SubSSRPageProps) => <SubstancePage sub={sub} />;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });
  const { subCode } = context.params as ContextParams;

  const { data } = await apolloClient.query<SubstanceQuery, SubstanceQueryVariables>({
    query: SubstanceDocument,
    fetchPolicy: 'no-cache',
    variables: {
      subCode,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      sub: data.getSubstance ?? null,
    },
  });
};

export default PageSubServerSideRendered;
