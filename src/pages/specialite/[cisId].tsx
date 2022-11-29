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

const PageCisServerSideRendered = ({ cis }: CisSSRPageProps) => (
  // TODO: rm comments
  // query is cached on SSR and not fetched again !!

  // const cached = client.readQuery<SpecialityQuery, SpecialityQueryVariables>({
  //   query: SpecialityDocument,
  //   variables: {
  //     cisId: query.cisId as string,
  //   },
  // });

  // const { data: clientSideData } = useSpecialityQuery({
  //   fetchPolicy: 'cache-first',
  //   variables: { cisId: query.cisId as string },
  // });

  // console.log(cached);
  // console.log('--------');
  // console.log(clientSideData?.getSpeciality);

  <SpecialityPage cis={cis} />
);
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient({ context });
  const { cisId } = context.params as ContextParams;

  const { data } = await apolloClient.query<SpecialityQuery, SpecialityQueryVariables>({
    query: SpecialityDocument,
    fetchPolicy: 'cache-first',
    variables: {
      cisCode: cisId,
    },
  });

  console.log(data);

  return addApolloState(apolloClient, {
    props: {
      cis: data?.getSpeciality ?? null,
    },
  });
};

export default PageCisServerSideRendered;
