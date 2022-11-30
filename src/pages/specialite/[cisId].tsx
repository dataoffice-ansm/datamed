import type { GetServerSidePropsContext } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type {
  Speciality,
  SpecialityQuery,
  SpecialityQueryVariables,
} from '../../graphql/__generated__/generated-documents';
import { SpecialityDocument } from '../../graphql/__generated__/generated-documents';
import { SpecialityPage } from '../../componentsPages/Speciality/SpecialityPage';
import { addApolloState, initializeApolloClient } from '../../config/apolloClient';

type CisSSRPageProps = {
  cis: Speciality;
};

type ContextParams = {
  cisId: string;
} & ParsedUrlQuery;

const PageCisServerSideRendered = ({ cis }: CisSSRPageProps) => <SpecialityPage cis={cis} />;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });
  const { cisId } = context.params as ContextParams;

  try {
    const { data } = await apolloClient.query<SpecialityQuery, SpecialityQueryVariables>({
      query: SpecialityDocument,
      // fetchPolicy: 'cache-first',
      fetchPolicy: 'no-cache',
      variables: {
        cisCode: cisId,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        cis: data?.getSpeciality ?? null,
      },
    });
  } catch (err: unknown) {
    console.log('Failed to fetch blerp');
    console.log(err);

    return addApolloState(apolloClient, {
      props: {},
    });
  }
};

export default PageCisServerSideRendered;
