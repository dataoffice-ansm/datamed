import { useRouter } from 'next/router';
import { SpecialityPage } from '../../componentsPages/Speciality/SpecialityPage';
import Page404 from '../[404]';
import { useSpecialityQuery } from '../../graphql/__generated__/generated-documents';

const PageCisCSR = () => {
  const { query } = useRouter();
  const cisId = query.cisId as string;

  const { data, error, loading } = useSpecialityQuery({
    fetchPolicy: 'no-cache',
    variables: { cisId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data?.getSpeciality) {
    return <SpecialityPage cis={data.getSpeciality} />;
  }

  return <Page404 />;
};

export default PageCisCSR;
