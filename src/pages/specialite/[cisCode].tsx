import type { GetServerSidePropsContext } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type {
  SpecialityQuery,
  SpecialityQueryVariables,
  Speciality,
} from '../../graphql/__generated__/generated-documents';
import { SpecialityDocument } from '../../graphql/__generated__/generated-documents';
import { SpecialityPage } from '../../componentsPages/Speciality/SpecialityPage';
import { addApolloState, initializeApolloClient } from '../../config/apolloClient';
import { getServerSideErrors } from '../../utils/errors';
import toast from 'react-hot-toast';
import Page404 from '../[404]';

type CisSSRPageProps = {
  cis: Speciality;
  err?: string;
};

type ContextParams = {
  cisCode: string;
} & ParsedUrlQuery;

const PageCisServerSideRendered = ({ cis, err }: CisSSRPageProps) => {
  if (!cis) {
    console.log(err);
    if (err) {
      toast.error(err);
    }

    return <Page404 />;
  }

  return <SpecialityPage cis={cis} />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });
  const { cisCode } = context.params as ContextParams;

  try {
    const { data } = await apolloClient.query<SpecialityQuery, SpecialityQueryVariables>({
      query: SpecialityDocument,
      variables: {
        cisCode,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        cis: data?.getSpeciality ?? null,
      },
    });
  } catch (err: unknown) {
    console.log('Failed to fetch Speciality for given code', cisCode);
    return getServerSideErrors(err);
  }
};

export default PageCisServerSideRendered;
