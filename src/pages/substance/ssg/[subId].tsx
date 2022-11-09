import type { GetStaticPaths, GetStaticProps } from 'next';
import { getSpecialitiesPaths } from '../../../services/specialities';
import type { Substance } from '../../../api/interfaces/models';
import type { ParsedUrlQuery } from 'querystring';
import { SubstancePage } from 'componentsPages/Substance/SubstancePage';
import { getSingleSubstance } from 'services/substances';

type ContextParams = {
  subId: string;
} & ParsedUrlQuery;

// eslint-disable-next-line @typescript-eslint/naming-convention
const PageSubSSG = ({ sub }: { sub: Substance }) => <SubstancePage sub={sub} />;

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
  if (data?.codes) {
    const paths = data.codes.map((subId) => ({
      params: { subId },
    }));
    return { paths, fallback: true };
  }

  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps<{ sub?: Partial<Substance> }> = async (context) => {
  const { subId } = context.params as ContextParams;
  const sub = await getSingleSubstance(subId);

  if (sub) {
    return {
      props: {
        sub,
      },
    };
  }

  return {
    props: {},
  };
};

export default PageSubSSG;
