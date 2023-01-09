import ManFigure from '../../assets/pictos/man_illustration.svg';
import WomanFigure from '../../assets/pictos/woman_illustration.svg';
import { GraphFigure } from '../../components/GraphFigure';
import { DevPageLayout } from '../../components/Layouts/DevPageLayout';
import { Button } from '../../components/Button/Button';

const GraphFigurePage = () => (
  <DevPageLayout title="graphFigure">
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-turquoise">with secondary color</p>
        <GraphFigure
          id="graph-figure-homme"
          value={53}
          valueClassName="text-secondary"
          label="Hommes"
          icon={<ManFigure width={150} height={150} />}
          action={
            <a rel="external noreferrer" target="_blank" href="http://fake.com">
              action
            </a>
          }
        />
      </div>
      <div>
        <p className="text-primary">with default color (primary)</p>
        <GraphFigure
          value={47}
          label="Femme"
          icon={<WomanFigure width={150} height={150} />}
          action={
            <a rel="external noreferrer" target="_blank" href="http://fake.com">
              action
            </a>
          }
        />
      </div>
    </div>
  </DevPageLayout>
);

export default GraphFigurePage;
