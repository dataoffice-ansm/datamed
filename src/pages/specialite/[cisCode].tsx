import type { GetServerSidePropsContext } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type {
  SpecialityQuery,
  SpecialityQueryVariables,
  Speciality,
  SpecialityIdByCodeQuery,
  SpecialityIdByCodeQueryVariables,
} from '../../graphql/__generated__/generated-documents';
import {
  SpecialityDocument,
  SpecialityIdByCodeDocument,
} from '../../graphql/__generated__/generated-documents';
import { SpecialityPage } from '../../componentsPages/Speciality/SpecialityPage';
import { addApolloState, initializeApolloClient } from '../../config/apolloClient';

type CisSSRPageProps = {
  cis: Speciality;
};

type ContextParams = {
  cisCode: string;
} & ParsedUrlQuery;

const PageCisServerSideRendered = ({ cis }: CisSSRPageProps) => <SpecialityPage cis={cis} />;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });
  const { cisCode } = context.params as ContextParams;

  try {
    const { data: dataId } = await apolloClient.query<
      SpecialityIdByCodeQuery,
      SpecialityIdByCodeQueryVariables
    >({
      query: SpecialityIdByCodeDocument,
      // fetchPolicy: 'cache-first',
      fetchPolicy: 'no-cache',
      variables: {
        cisCode,
      },
    });

    if (dataId?.getSpecialityIdByCode) {
      const { data } = await apolloClient.query<SpecialityQuery, SpecialityQueryVariables>({
        query: SpecialityDocument,
        // fetchPolicy: 'cache-first',
        fetchPolicy: 'no-cache',
        variables: {
          cisId: dataId.getSpecialityIdByCode,
        },
      });

      return addApolloState(apolloClient, {
        props: {
          cis: data?.getSpeciality ?? null,
        },
      });
    }
  } catch (err: unknown) {
    console.log('Failed to fetch blerp');
    console.log(err);

    return addApolloState(apolloClient, {
      props: {},
    });
  }
};

export default PageCisServerSideRendered;
