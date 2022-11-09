import { getByTestId, getByText, render } from '@testing-library/react';
import { IntroSection } from './IntroSection';

describe(IntroSection.name, () => {
  test('should render', () => {
    const expectedTitle = 'Accès public aux données de L’ANSM sur les médicaments';
    const expectedDescription =
      'Que vous soyez particulier, industriel ou professionnel de santé, vous trouverez sur ce site différentes informations relatives à la vie des médicaments compilées par l’ANSM et ses partenaires.';
    const { container } = render(<IntroSection />);

    const title = getByText(container, expectedTitle);
    expect(title.tagName).toEqual('H2');

    expect(getByText(container, expectedDescription));
    expect(getByTestId(container, 'Illustration de recherches et médicaments'));

    expect(container).toMatchSnapshot();
  });
});
