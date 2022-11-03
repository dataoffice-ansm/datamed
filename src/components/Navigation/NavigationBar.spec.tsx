import { render } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';

describe(NavigationBar.name, () => {
  test.skip('should render', () => {
    const { container } = render(<NavigationBar />);
    expect(container).toBeDefined();
  });
});
