import type { GetServerSideProps } from 'next';
import { getSingleSpeciality } from '../../../services/specialities';
import type { Speciality } from '../../../api/models';
import type { ParsedUrlQuery } from 'querystring';
import { SpecialityPage } from '../../../components/Speciality/SpecialityPage';

type ContextParams = {
  cisId: string;
} & ParsedUrlQuery;

// eslint-disable-next-line @typescript-eslint/naming-convention
const PageCisSSR = ({ cis }: { cis: Speciality }) => <SpecialityPage cis={cis} />;

export const getServerSideProps: GetServerSideProps<{ cis?: Speciality }> = async (context) => {
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

export default PageCisSSR;
