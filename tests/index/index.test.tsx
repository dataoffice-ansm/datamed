import { render, screen } from '@testing-library/react';
import Home from '../../src/pages';

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /welcome/i,
    });

    expect(heading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
