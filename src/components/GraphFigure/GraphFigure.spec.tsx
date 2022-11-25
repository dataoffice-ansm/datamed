import { GraphFigure } from './GraphFigure';
import { getByTestId, getByText, render } from '@testing-library/react';
import WomanIllustration from '../../assets/images/woman_illustration.svg';

describe(GraphFigure.name, () => {
  test('should render', () => {
    const graphFigure = render(
      <GraphFigure
        value={0}
        valueClassName="text-turquoise"
        description="fake description"
        callToActionProps={{ as: 'link', href: 'faq' }}
        icon={<WomanIllustration alt="woman-svg" width={150} height={150} />}
      />
    );

    expect(getByText(graphFigure.container, 'fake description'));
    expect(getByText(graphFigure.container, 'Voir détails'));
    expect(getByTestId(graphFigure.container, 'woman-svg'));
  });
});
