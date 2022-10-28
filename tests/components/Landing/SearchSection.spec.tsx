import { getByRole, getByTestId, getByText, render } from '@testing-library/react';
import { SearchSection } from '../../../src/components/Landing/SearchSection';

describe(SearchSection.name, () => {
  test('should render', () => {
    const expectedTitle =
      'Trouvez des données statistiques autour du médicament à partir du nom du médicament ou de la substance active.';
    const { container } = render(<SearchSection />);

    const title = getByText(container, expectedTitle);
    expect(title.tagName).toEqual('H2');

    expect(getByRole(container, 'search'));
    expect(getByTestId(container, 'Illustration de microscope et analyse'));

    expect(container).toMatchSnapshot();
  });
});
