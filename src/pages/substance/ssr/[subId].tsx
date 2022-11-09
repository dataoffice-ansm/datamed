import type { GetServerSideProps } from 'next';
import type { Substance } from '../../../api/interfaces/models';
import type { ParsedUrlQuery } from 'querystring';
import { getSingleSubstance } from 'services/substances';
import { SubstancePage } from 'componentsPages/Substance/SubstancePage';

type ContextParams = {
  subId: string;
} & ParsedUrlQuery;

// eslint-disable-next-line @typescript-eslint/naming-convention
const PageSubSSR = ({ sub }: { sub: Substance }) => <SubstancePage sub={sub} />;

export const getServerSideProps: GetServerSideProps<{ sub?: Partial<Substance> }> = async (
  context
) => {
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

export default PageSubSSR;
