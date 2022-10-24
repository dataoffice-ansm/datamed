import { render } from '@testing-library/react';
import { SideMenu } from '../../src/components/SideMenu/SideMenu';
import { SectionPage } from '../../src/config/menu/model';
import React, { ReactNode } from 'react';
import { MenuItem } from '../../src/components/SideMenu/MenuItem';

jest.mock('react-scroll', () => {
  const Link: React.FC<{ childen: ReactNode; onSetActive?: () => void }> = ({
    childen,
    onSetActive,
  }) => <a onClick={onSetActive}>{childen}</a>;

  return {
    Link,
    Events: {
      scrollEvent: {
        register: () => {
          return void 0;
        },
      },
    },
  };
});

describe(SideMenu.name, () => {
  const id = 'sample-menu';
  const items: SectionPage[] = [
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
  test('should render', () => {
    const fixture = render(<SideMenu id={id} items={items} mode="auto" />);
    expect(fixture).toBeDefined();
  });

  test.each<[string, 'primary' | 'secondary']>([
    ['white', 'primary'],
    ['secondary', 'secondary'],
  ])('should render %s with theme %p', (color, colorTheme) => {
    const fixture = render(
      <SideMenu id={id} items={items} colorMenu={colorTheme}>
        {items.map(({ id, label }, i) => (
          <MenuItem key={i} id={id} color={color}>
            {label}
          </MenuItem>
        ))}
      </SideMenu>
    );
    expect(fixture.container.children[0].children[0].className).toContain(`bg-${color}`);
  });
});
