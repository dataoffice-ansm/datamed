import ManFigure from '../../assets/images/man_illustration.svg';
import WomanFigure from '../../assets/images/woman_illustration.svg';
import { GraphFigure } from '../../components/GraphFigure';

const GraphFigurePage = () => (
  <div className="flex flex-row item-center space-x-3.5">
    <div>
      <h3 className="text-turquoise">with secondary color</h3>
      <GraphFigure
        percentage={0.53}
        percentageClassName="text-secondary"
        description="Hommes"
        link="http://fake.com"
        icon={<ManFigure width={150} height={150} />}
      />
    </div>
    <div>
      <h3 className="text-primary">with default color (primary)</h3>
      <GraphFigure
        percentage={0.47}
        description="Femme"
        link="http://fake.com"
        icon={<WomanFigure width={150} height={150} />}
      />
    </div>
  </div>
);

export default GraphFigurePage;
