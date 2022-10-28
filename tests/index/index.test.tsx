import { render } from '@testing-library/react';
import Home from '../../src/pages';

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
