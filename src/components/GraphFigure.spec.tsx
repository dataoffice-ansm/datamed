import { GraphFigure } from '../../src/components/GraphFigure';
import { getByAltText, getByTestId, getByText, render } from '@testing-library/react';
import WomanIllustration from '../../src/assets/images/woman_illustration.svg';

describe(GraphFigure.name, () => {
  test('should render', () => {
    const graphFigure = render(
      <GraphFigure
        percentage={0}
        percentageClassName="text-turquoise"
        description="fake description"
        link="http://fake.com"
        icon={<WomanIllustration alt="woman-svg" width={150} heigth={150} />}
      />
    );

    const link: HTMLAnchorElement = getByText(graphFigure.container, 'Voir détails');
    expect(getByText(graphFigure.container, 'fake description'));
    expect(link.href).toEqual('http://fake.com/');
    expect(getByTestId(graphFigure.container, 'woman-svg'));
  });
});
