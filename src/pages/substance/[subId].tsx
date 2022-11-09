import { useRouter } from 'next/router';
import { useFetchSubstance } from '../../services/substances';
import { SubstancePage } from '../../componentsPages/Substance/SubstancePage';
import Page404 from '../[404]';

// eslint-disable-next-line @typescript-eslint/naming-convention
const PageSubCSR = () => {
  const { query } = useRouter();
  const subId = query.subId as string;
  const { data, error } = useFetchSubstance(subId);

  if (error ?? !data) {
    return <Page404 />;
  }

  return <SubstancePage sub={data} />;
};

export default PageSubCSR;
