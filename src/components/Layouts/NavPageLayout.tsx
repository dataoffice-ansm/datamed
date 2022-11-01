import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import { useTabSelected } from '../../hooks/useTabSelected';
import type { ReactNode } from 'react';
import React, { Fragment, useMemo } from 'react';
import { Link } from 'react-scroll';
import { useBreakpoint } from '../../hooks/useTailwindBreakpoint';

export type SectionNavProps = {
  id: string;
  label: string;
};

export type SectionItemProps = SectionNavProps & {
  content: ReactNode;
};

/**
 *
 * @param id
 * @param colorMenu
 * @param defaultSelectedSection
 * @param children
 * @constructor
 */
export const NavPageLayout = ({
  colorMenu = 'primary',
  defaultSelectedSection,
  render,
  sections,
  id,
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultSelectedSection?: number;
  colorMenu?: 'primary' | 'secondary';
  sections: SectionItemProps[];
  render: (content: ReactNode) => ReactNode;
}) => {
  const isDesktop = useBreakpoint('md');
  const sectionsNav: SectionNavProps[] = sections.map(({ id, label }) => ({
    id,
    label,
  }));

  const [selectedIndex, handleSelectedIndex] = useTabSelected(sectionsNav, defaultSelectedSection);

  const RenderNavigation = ({
    vertical,
    itemClassName,
  }: {
    vertical?: boolean;
    itemClassName: string;
  }) => (
    <Tab.Group
      vertical={vertical}
      selectedIndex={selectedIndex}
      onChange={(anchor) => {
        handleSelectedIndex(anchor);
      }}
    >
      <Tab.List id={id} className="bg-gray-200 relative">
        {sections.map(({ id, label }, index) => (
          <Link key={id} spy smooth className="no-underline" to={id} duration={200} offset={-80}>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  id={id}
                  className={classnames(
                    'outline-0 text-grey',
                    selected ? 'selected font-bold' : 'notSelected',
                    colorMenu === 'primary' && 'hover:text-primary',
                    colorMenu === 'secondary' && 'hover:text-secondary',
                    itemClassName
                  )}
                >
                  {index + 1} . {label}
                </div>
              )}
            </Tab>
          </Link>
        ))}

        {vertical && (
          <div
            style={{
              top: `calc((100% / ${sections.length}) * ${selectedIndex})`,
            }}
            className={classnames(
              'sideMenuHelper bg-primary w-[2px]',
              'transition-all ease-in-out absolute left-full',
              itemClassName
            )}
          />
        )}
      </Tab.List>
    </Tab.Group>
  );

  const renderContent = useMemo(
    () => (
      <div className="content flex-1 my-4">
        {render(
          sections.map(({ id, content }) => (
            <section key={id} id={id} className="border border-solid border-gray-500 my-2">
              {content}
            </section>
          ))
        )}
      </div>
    ),
    [render, sections]
  );

  if (isDesktop) {
    return (
      <div className="desktopLayout flex gap-2 relative">
        <div className="sideMenuNav flex flex-col w-[12rem]">
          <div className="sideMenuInner sticky top-[100px]">
            <RenderNavigation vertical itemClassName="h-16 py-4" />
          </div>
        </div>
        {renderContent}
      </div>
    );
  }

  return (
    <div className="mobileLayout flex flex-col gap-2 relative">
      <h6 className="m-0 text-primary">Navigation</h6>
      <div className="mobileNav border-b border-grey border-solid">
        <RenderNavigation itemClassName="" />
      </div>
      {renderContent}
    </div>
  );
};
