import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import { useTabSelected } from '../../../hooks/useTabSelected';
import type { ReactNode } from 'react';
import React, { Fragment, useMemo } from 'react';
import { Link } from 'react-scroll';
import { useBreakpoint } from '../../../hooks/useTailwindBreakpoint';
import { useLayoutContext } from '../../../contexts/LayoutContext';
import { HeroHeader } from '../../HeroHeader/HeroHeader';
import { FullWidthRow } from '../../FullWidthRow/FullWidthRow';
import { useEntityContext } from '../../../contexts/EntityContext';

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
export const EntityPageLayout = ({
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
  const { navBarHeight, stickyHeroHeight } = useLayoutContext();
  const isDesktop = useBreakpoint('md');
  const { currentCis } = useEntityContext();
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
      <Tab.List id={id} className="relative mt-8 mr-4">
        {sections.map(({ id, label }) => (
          <Link key={id} spy smooth className="no-underline" to={id} duration={200} offset={-80}>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  tabIndex={1}
                  id={id}
                  className={classnames(
                    'text-grey cursor-pointer md:text-right pr-6',
                    selected ? 'selected font-bold' : 'notSelected',
                    colorMenu === 'primary' && 'hover:text-primary',
                    colorMenu === 'secondary' && 'hover:text-secondary',
                    itemClassName
                  )}
                >
                  {label.toUpperCase()}
                </div>
              )}
            </Tab>
          </Link>
        ))}

        <div
          className={classnames(
            'sideMenuHelper bg-grey-300 w-[1px] top-0',
            'transition-all ease-in-out absolute left-full h-full'
          )}
        />

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
            <section
              key={id}
              id={id}
              className="ease-linear duration-300 transition-padding my-2"
              style={{ paddingTop: stickyHeroHeight }}
            >
              <div className="border border-solid border-gray-500">{content}</div>
            </section>
          ))
        )}
      </div>
    ),
    [render, sections, stickyHeroHeight]
  );

  const renderLayout = (children: ReactNode): JSX.Element => (
    <div>
      <HeroHeader />
      <FullWidthRow className="bg-background">
        <div className="w-full">{children}</div>
      </FullWidthRow>
    </div>
  );

  if (isDesktop) {
    return renderLayout(
      <div className="desktopLayout flex gap-2 relative">
        <div className="sideMenuNav flex flex-col flex-1">
          <div
            style={{ top: stickyHeroHeight + navBarHeight }}
            className="sideMenuInner sticky ease-in-out duration-700 transition-top"
          >
            <RenderNavigation vertical itemClassName="h-16 py-4" />
          </div>
        </div>
        <div className="flex-[3]">{renderContent}</div>
      </div>
    );
  }

  return renderLayout(
    <div className="mobileLayout flex flex-col gap-2 relative">
      <h6 className="m-0 text-primary">Navigation</h6>
      <div className="mobileNav border-b border-grey border-solid">
        <RenderNavigation itemClassName="" />
      </div>
      {renderContent}
    </div>
  );
};
