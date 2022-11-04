import { useRouter } from 'next/router';
import { useFetchSpeciality } from '../../services/specialities';
import { SpecialityPage } from '../../components/Speciality/SpecialityPage';

// eslint-disable-next-line @typescript-eslint/naming-convention
const PageCisCSR = () => {
  const { query } = useRouter();
  const cisId = query.cisId as string;
  const { data, error, isValidating } = useFetchSpeciality(cisId);

  if (isValidating) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p> 404 </p>;
  }

  return <SpecialityPage cis={data} />;
};

export default PageCisCSR;
