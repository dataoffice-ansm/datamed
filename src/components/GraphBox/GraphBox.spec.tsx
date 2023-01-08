import { GraphBox } from './GraphBox';
import { getByTestId, getByText, render } from '@testing-library/react';
import SickPerson from '../../assets/pictos/sick_person.svg';

describe(GraphBox.name, () => {
  test('should render', () => {
    const { container } = render(
      <GraphBox title="Nombre de personnes malades pendant l'autonme">
        <SickPerson alt="sick-person" width={150} heigth={150} />
      </GraphBox>
    );

    expect(getByText(container, "Nombre de personnes malades pendant l'autonme"));
    expect(getByTestId(container, 'sick-person'));
    expect(container).toMatchSnapshot();
  });
});
