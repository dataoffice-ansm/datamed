import { render } from '@testing-library/react';
import type { SideMenuItemProps } from '../../src/components/Layouts/SideMenuPageLayout';
import SideMenuPageLayout from '../../src/components/Layouts/SideMenuPageLayout';
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

describe(SideMenuPageLayout.Wrapper.name, () => {
  test('should render', () => {
    const wrapper = render(<SideMenuPageLayout.Wrapper />);
    expect(wrapper).toBeDefined();
  });

  test.each<[string, 'primary' | 'secondary']>([
    ['white', 'primary'],
    ['secondary', 'secondary'],
  ])('should render %s with theme %p', (color, colorTheme) => {
    const items: SideMenuItemProps[] = [
      {
        id: 'menu-1',
        label: 'menu 1',
      },
      {
        id: 'menu-2',
        label: 'menu 2',
      },
      {
        id: 'menu-3',
        label: 'menu 3',
      },
    ];

    const wrapper = render(
      <SideMenuPageLayout.Wrapper colorMenu={colorTheme}>
        {items.map(({ id, label }) => (
          <SideMenuPageLayout.Item key={id} id={id} label={label} color={color}>
            <p>{label}</p>
          </SideMenuPageLayout.Item>
        ))}
      </SideMenuPageLayout.Wrapper>
    );
    expect(wrapper).toBeDefined();
  });
});
