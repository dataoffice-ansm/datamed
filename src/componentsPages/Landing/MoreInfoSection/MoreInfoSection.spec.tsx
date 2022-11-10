import { getByText, render } from '@testing-library/react';
import { MoreInfoSection } from './MoreInfoSection';

describe(MoreInfoSection.name, () => {
  test('should render', () => {
    const { container } = render(<MoreInfoSection />);

    const title = getByText(container, 'Données d’ensemble');
    expect(title.tagName).toEqual('H2');

    expect(container.innerHTML).toContain(
      'Envie d’en savoir plus sur les données qui constituent ce site ?'
    );
    expect(container.innerHTML).toContain(
      'Consultez les déclarations reçues par l’ANSM pour l’ensemble des médicaments et substances actives autorisés sur le territoire national.'
    );

    expect(container.getElementsByClassName('CardWithImage').length).toEqual(2);

    expect(container).toMatchSnapshot();
  });
});
