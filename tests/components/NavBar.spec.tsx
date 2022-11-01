import { render } from '@testing-library/react';
import { NavigationBar } from '../../src/components/Navigation/NavigationBar';

describe(NavigationBar.name, () => {
  test.skip('should render', () => {
    const { container } = render(<NavigationBar />);
    expect(container).toBeDefined();
  });
});
