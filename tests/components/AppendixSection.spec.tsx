import { getByTestId, render } from '@testing-library/react';
import { AppendixAnchor } from '../../src/components/AppendixAnchor';

describe(AppendixAnchor.name, () => {
  test('should render', () => {
    const { container } = render(<AppendixAnchor appendixAnchor="/search" />);
    expect(getByTestId(container, 'scroll'));
    expect(container).toMatchSnapshot();
  });
});
