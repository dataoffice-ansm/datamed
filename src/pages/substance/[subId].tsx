import { useRouter } from 'next/router';
import { SubstancePage } from '../../componentsPages/Substance/SubstancePage';
import Page404 from '../[404]';
import { useSubstanceQuery } from '../../graphql/__generated__/generated-documents';

const PageSubCSR = () => {
  const { query } = useRouter();
  const subCodeId = query.subId as string;

  const { data, error, loading } = useSubstanceQuery({
    fetchPolicy: 'no-cache',
    variables: { subCodeId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data?.getSubstance) {
    return <SubstancePage sub={data.getSubstance} />;
  }

  return <Page404 />;
};

export default PageSubCSR;
