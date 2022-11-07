import type { GetStaticPaths, GetStaticProps } from 'next';
import { getSpecialitiesPaths, getSingleSpeciality } from '../../../services/specialities';
import type { Speciality } from '../../../api/interfaces/models';
import type { ParsedUrlQuery } from 'querystring';
import { SpecialityPage } from '../../../components/Speciality/SpecialityPage';

type ContextParams = {
  cisId: string;
} & ParsedUrlQuery;

// eslint-disable-next-line @typescript-eslint/naming-convention
const PageCisSSG = ({ cis }: { cis: Speciality }) => <SpecialityPage cis={cis} />;

export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const data = await getSpecialitiesPaths();
  if (data.codes) {
    const paths = data.codes.map((cisId) => ({
      params: { cisId },
    }));
    return { paths, fallback: true };
  }

  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps<{ cis?: Speciality }> = async (context) => {
  const { cisId } = context.params as ContextParams;
  const cis = await getSingleSpeciality(cisId);

  if (cis) {
    return {
      props: {
        cis,
      },
    };
  }

  return {
    props: {},
  };
};

export default PageCisSSG;
