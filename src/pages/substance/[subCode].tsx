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

  try {
    const { data } = await apolloClient.query<SubstanceQuery, SubstanceQueryVariables>({
      query: SubstanceDocument,
      variables: {
        subCode,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        sub: data.getSubstance ?? null,
      },
    });
  } catch (err: unknown) {
    console.log('Failed to fetch Substance for given code', subCode);
    console.log(err);

    return addApolloState(apolloClient, {
      props: {
        err: err instanceof Error ? err.message : err,
      },
    });
  }
};

export default PageSubServerSideRendered;
