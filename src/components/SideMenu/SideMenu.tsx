import { SectionPage } from '../../config/menu/model';
import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import { useTabSelected } from '../../hooks/useTabSelected.hook';
import React, { Children, ReactElement, ReactNode, useMemo } from 'react';
import { MenuItem, MenuItemProps } from './MenuItem';

interface SideMenuProps {
  id: string;
  items: SectionPage[];
  colorMenu?: 'primary' | 'secondary';
  children?: ReactNode;
  mode?: 'auto';
}

export const SideMenu = ({
  id,
  items = [],
  colorMenu = 'primary',
  mode,
  children,
}: SideMenuProps) => {
  const [selectedIndex, handleSelectedIndex] = useTabSelected(items, 0);

  const calculateSlideStylePosition = useMemo(
    () => () => {
      return {
        top: `calc((100% / ${items.length}) * ${selectedIndex})`,
        height: `calc(100% / ${items.length})`,
      };
    },
    [selectedIndex, items.length]
  );

  const childNodes = children
    ? (Children.toArray(children).filter(Boolean) as [ReactElement<MenuItemProps>])
    : null;

  return (
    <nav>
      <Tab.Group onChange={handleSelectedIndex} selectedIndex={selectedIndex} vertical>
        <Tab.List
          id={id}
          className={classnames(
            {
              'bg-white': colorMenu === 'primary',
              'bg-secondary': colorMenu === 'secondary',
            },
            'justify-around max-h-max',
            `fixed cursor-pointer`,
            'top-0 list-none m-0 p-0 w-48 bg-gray-200'
          )}
        >
          {childNodes &&
            childNodes.map((node, i) => (
              <Tab
                key={i}
                id={node.props.id}
                className={classnames(
                  {
                    'text-grey-700 hover:text-dark-violet-100': colorMenu === 'primary',
                    'text-black': colorMenu === 'secondary',
                  },
                  `block text-right no-underline p-10`
                )}
              >
                {node}
              </Tab>
            ))}

          {mode &&
            mode === 'auto' &&
            items.map(({ id, label }, i) => (
              <Tab
                key={i}
                id={id}
                className={classnames(
                  'text-grey-700 hover:text-primary',
                  `block text-right no-underline p-10`
                )}
              >
                <MenuItem id={id} color={colorMenu}>
                  {label}
                </MenuItem>
              </Tab>
            ))}
          <div
            style={calculateSlideStylePosition()}
            className={classnames(
              'border-l-primary',
              'transition-all ease-in-out delay-150 absolute -ml-1 left-full border-l-4'
            )}
          ></div>
        </Tab.List>
      </Tab.Group>
    </nav>
  );
};
