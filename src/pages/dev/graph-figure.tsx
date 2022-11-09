import ManFigure from '../../assets/images/man_illustration.svg';
import WomanFigure from '../../assets/images/woman_illustration.svg';
import { GraphFigure } from '../../components/GraphFigure/GraphFigure';
import { DevPageLayout } from '../../components/Layouts/DevPageLayout';

const GraphFigurePage = () => (
  <DevPageLayout title="graphFigure">
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-turquoise">with secondary color</p>
        <GraphFigure
          id="graph-figure-homme"
          value={53}
          valueClassName="text-secondary"
          description="Hommes"
          link="http://fake.com"
          icon={<ManFigure width={150} height={150} />}
        />
      </div>
      <div>
        <p className="text-primary">with default color (primary)</p>
        <GraphFigure
          value={47}
          description="Femme"
          link="http://fake.com"
          icon={<WomanFigure width={150} height={150} />}
        />
      </div>
    </div>
  </DevPageLayout>
);

export default GraphFigurePage;
