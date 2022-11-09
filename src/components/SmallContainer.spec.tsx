import { render } from '@testing-library/react';
import { SmallContainer } from './SmallContainer';

describe(SmallContainer.name, () => {
  const fixture = render(
    <SmallContainer>
      <div>content</div>
    </SmallContainer>
  );
  test('should render', () => {
    expect(fixture).toBeDefined();
  });
});
