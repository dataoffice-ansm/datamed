import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import { useTabSelected } from '../../hooks/useTabSelected';
import type { ReactElement, ReactNode } from 'react';
import React, { Children, useMemo } from 'react';
import { Link } from 'react-scroll';

export type SideMenuItemProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  label: string;
};

/**
 *
 * @param id
 * @param label
 * @constructor
 */
const MenuItem = ({ id, label }: SideMenuItemProps) => (
  <Link spy smooth activeClass="text-black active" to={id} duration={200}>
    {label}
  </Link>
);

/**
 *
 * @param id
 * @param colorMenu
 * @param defaultSelectedSection
 * @param children
 * @constructor
 */
const SideMenuPageLayout = ({
  colorMenu = 'primary',
  defaultSelectedSection,
  children,
  id,
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultSelectedSection?: number;
  colorMenu?: 'primary' | 'secondary';
  children?: ReactNode | ReactNode[];
}) => {
  const childrenItems = children
    ? (Children.toArray(children).filter(Boolean) as [ReactElement<SideMenuItemProps>])
    : [];

  const extractedSectionsFromContent = childrenItems.map((child) => ({
    id: child.props.id,
    label: child.props.label,
  }));

  const [selectedIndex, handleSelectedIndex] = useTabSelected(
    extractedSectionsFromContent,
    defaultSelectedSection
  );

  const calculateSlideStylePosition = useMemo(
    () => () => ({
      top: `calc((100% / ${extractedSectionsFromContent.length}) * ${selectedIndex})`,
      height: `calc(100% / ${extractedSectionsFromContent.length})`,
    }),
    [selectedIndex, extractedSectionsFromContent.length]
  );

  return (
    <div className="pageWithSideMenu flex gap-2 relative">
      <div className="sideMenu hidden md:flex flex-col w-[12rem]">
        <div className="sideMenuInner sticky top-[100px]">
          <Tab.Group
            vertical
            selectedIndex={selectedIndex}
            onChange={(anchor) => {
              handleSelectedIndex(anchor);
            }}
          >
            <Tab.List id={id} className="list-none m-0 p-0 bg-gray-200 relative">
              {extractedSectionsFromContent.map(({ id, label }) => (
                <Link
                  key={id}
                  spy
                  smooth
                  className="no-underline"
                  activeClass="active"
                  to={id}
                  duration={200}
                  offset={-100}
                >
                  <Tab
                    id={id}
                    className={classnames(
                      'block p-2 outline-0 text-grey hover:font-bold',
                      colorMenu === 'primary' && 'hover:text-primary',
                      colorMenu === 'secondary' && 'hover:text-secondary'
                    )}
                  >
                    {label}
                  </Tab>
                </Link>
              ))}

              <div
                style={calculateSlideStylePosition()}
                className={classnames(
                  'sideMenuHelper bg-primary w-[2px]',
                  'transition-all ease-in-out absolute left-full'
                )}
              />
            </Tab.List>
          </Tab.Group>
        </div>
      </div>

      <div className="content flex-1">
        {childrenItems.map((child) => (
          <section
            key={child.props.id}
            id={child.props.id}
            className="border border-solid border-gray-500 my-2"
          >
            {child.props.children}
          </section>
        ))}
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { Wrapper: SideMenuPageLayout, Item: MenuItem };
