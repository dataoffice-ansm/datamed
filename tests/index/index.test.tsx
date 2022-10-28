import { render } from '@testing-library/react';
import Home from '../../src/pages';

describe('Home', () => {
  test('should render', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
