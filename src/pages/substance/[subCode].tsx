import type { ParsedUrlQuery } from 'querystring';
import { SubstancePage } from '../../componentsPages/Substance/SubstancePage';
import type {
  Substance,
  SubstanceQuery,
  SubstanceQueryVariables,
} from '../../graphql/__generated__/generated-documents';
import { SubstanceDocument } from '../../graphql/__generated__/generated-documents';
import type { GetServerSidePropsContext } from 'next';
import { addApolloState, initializeApolloClient } from '../../config/apolloClient';
import toast from 'react-hot-toast';

type SubSSRPageProps = {
  sub: Substance;
  err?: string;
};

type ContextParams = {
  subCode: string;
} & ParsedUrlQuery;

const PageSubServerSideRendered = ({ sub, err }: SubSSRPageProps) => {
  if (err) {
    toast.error(err);
  }

  return <SubstancePage sub={sub} />;
};

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

    if (!data.getSubstance) {
      return {
        notFound: true,
      };
    }

    return addApolloState(apolloClient, {
      props: {
        sub: data.getSubstance ?? null,
      },
    });
  } catch (err: unknown) {
    console.log('Failed to fetch Substance for given code', subCode);
    console.log(err);

    return {
      props: {
        err: err instanceof Error ? err.message : err,
      },
    };
  }
};

export default PageSubServerSideRendered;
