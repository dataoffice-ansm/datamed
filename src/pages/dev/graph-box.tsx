import { GraphBox } from '../../components/GraphBox';
import SickPerson from '../../assets/images/sick_person.svg';

export const GraphBoxPage = () => (
  <div>
    <h2 className="underline"> GraphBox </h2>
    <GraphBox title="Répartition par sexe des patients traités">
      <SickPerson width={150} heigth={150} />
    </GraphBox>
  </div>
);

export default GraphBoxPage;
