import { useRouter } from 'next/router';
import { useFetchSpeciality } from '../../services/specialities';
import { SpecialityPage } from '../../componentsPages/Speciality/SpecialityPage';
import Page404 from '../[404]';

// eslint-disable-next-line @typescript-eslint/naming-convention
const PageCisCSR = () => {
  const { query } = useRouter();
  const cisId = query.cisId as string;
  const { data, error } = useFetchSpeciality(cisId);

  if (error ?? !data) {
    return <Page404 />;
  }

  return <SpecialityPage cis={data} />;
};

export default PageCisCSR;
