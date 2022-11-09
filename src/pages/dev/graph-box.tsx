import { GraphBox } from '../../components/GraphBox/GraphBox';
import SickPerson from '../../assets/images/sick_person.svg';
import { DevPageLayout } from '../../components/Layouts/DevPageLayout';

export const GraphBoxPage = () => (
  <DevPageLayout title="GraphBox">
    <div className="my-4">
      <GraphBox title="Répartition par sexe des patients traités">
        <SickPerson width={150} heigth={150} />
      </GraphBox>
    </div>
  </DevPageLayout>
);

export default GraphBoxPage;
