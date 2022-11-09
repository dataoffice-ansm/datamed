import { render } from '@testing-library/react';
import { EntityPageLayout } from './EntityPageLayout';
import type { ReactNode } from 'react';
import React from 'react';

jest.mock('react-scroll', () => {
  const Link: React.FC<{ children: ReactNode; onSetActive?: () => void }> = ({
    children,
    onSetActive,
  }) => <a onClick={onSetActive}>{children}</a>;

  return {
    Link,
    Events: {
      scrollEvent: {
        register() {
          return 0;
        },
      },
    },
  };
});

describe(EntityPageLayout.name, () => {
  test.each<[string, 'primary' | 'secondary']>([
    ['white', 'primary'],
    ['secondary', 'secondary'],
  ])('should render %s with theme %p', (color, colorTheme) => {
    const wrapper = render(
      <EntityPageLayout
        category="cis"
        colorMenu={colorTheme}
        sections={[
          {
            id: 'anchor1',
            label: '1',
            content: <p>1</p>,
          },
          {
            id: 'anchor2',
            label: '2',
            content: <p>2</p>,
          },
        ]}
        render={(content) => content}
      />
    );

    expect(wrapper).toBeDefined();
  });
});
