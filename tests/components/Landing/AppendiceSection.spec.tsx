import { getByTestId, render } from '@testing-library/react';
import { AppendiceSection } from '../../../src/components/Landing/AppendiceSection';

describe(AppendiceSection.name, () => {
  test('should render', () => {
    const { container } = render(<AppendiceSection />);
    expect(getByTestId(container, 'scroll'));

    expect(container).toMatchSnapshot();
  });
});
