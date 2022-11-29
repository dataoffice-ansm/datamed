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
  subId: string;
} & ParsedUrlQuery;

const PageSubServerSideRendered = ({ sub }: SubSSRPageProps) => <SubstancePage sub={sub} />;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });
  const { subId } = context.params as ContextParams;

  const { data } = await apolloClient.query<SubstanceQuery, SubstanceQueryVariables>({
    query: SubstanceDocument,
    variables: {
      subCode: subId,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      sub: data.getSubstance ?? null,
    },
  });
};

export default PageSubServerSideRendered;
