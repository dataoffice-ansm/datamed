import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import { useTabSelected } from '../../../hooks/useTabSelected';
import type { ReactNode } from 'react';
import React, { Fragment, useMemo } from 'react';
import { Link } from 'react-scroll';
import { useBreakpoint } from '../../../hooks/useTailwindBreakpoint';
import { useLayoutContext } from '../../../contexts/LayoutContext';
import { FullWidthRow } from '../../FullWidthRow/FullWidthRow';

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
 * @param render
 * @param sections
 * @param children
 * @param offsetContent
 * @constructor
 */
export const EntityPageLayout = ({
  colorMenu = 'primary',
  defaultSelectedSection,
  render,
  sections,
  id,
  children,
  offsetContent = 0,
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultSelectedSection?: number;
  colorMenu?: 'primary' | 'secondary' | 'green';
  sections: SectionItemProps[];
  render: (_content: ReactNode) => ReactNode;
  offsetContent?: number;
}) => {
  const { navBarHeight, stickyHeroHeight } = useLayoutContext();
  const isDesktop = useBreakpoint('md');
  const sectionsNav: SectionNavProps[] = sections.map(({ id, label }) => ({
    id,
    label,
  }));

  const [selectedIndex, handleSelectedIndex] = useTabSelected(sectionsNav, defaultSelectedSection);

  /**
   *
   * @param vertical
   * @param itemClassName
   * @constructor
   */
  const RenderNavigation = ({
    vertical,
    itemClassName,
  }: {
    vertical?: boolean;
    itemClassName?: string;
  }) => (
    <Tab.Group
      manual
      vertical={vertical}
      selectedIndex={selectedIndex}
      onChange={(anchor) => {
        handleSelectedIndex(anchor);
      }}
    >
      <Tab.List id={id} className="relative my-8 mr-4">
        {sections.map(({ id, label }, index) => (
          <Link
            key={id}
            spy
            smooth
            className="no-underline"
            to={id}
            duration={100}
            offset={-(navBarHeight + stickyHeroHeight + 10)}
            onSetActive={() => {
              handleSelectedIndex(index);
            }}
          >
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  tabIndex={1}
                  id={id}
                  className={classnames(
                    'sideMenuTab tracking-wider cursor-pointer md:text-right pr-6',
                    selected
                      ? 'selected border-r-[2px] font-medium'
                      : 'notSelected font-light text-grey-400',

                    colorMenu === 'primary' && 'hover:text-primary',
                    colorMenu === 'secondary' && 'hover:text-secondary',
                    colorMenu === 'green' && 'hover:text-dark-green-900',

                    selected && colorMenu === 'primary' && 'text-primary border-primary',
                    selected && colorMenu === 'secondary' && 'text-secondary border-secondary',
                    selected && colorMenu === 'green' && 'text-dark-green-900 border-green',

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
            'sideMenuHelperBg bg-grey-300 w-[2px] top-0 -ml-[2px] -z-[1]',
            'transition-all ease-in-out absolute left-full h-full'
          )}
        />
      </Tab.List>
    </Tab.Group>
  );

  const renderContent = useMemo(
    () => (
      <div className="EntityPageLayout flex-1 my-8">
        {render(
          sections.map(({ id, content }) => (
            <section
              key={id}
              id={id}
              className="sectionContent ease-linear duration-300 transition-padding mb-32"
            >
              {content}
            </section>
          ))
        )}
      </div>
    ),
    [render, sections]
  );

  const renderLayout = (children: ReactNode): JSX.Element => (
    <FullWidthRow className="bg-background">
      <div className="w-full">{children}</div>
    </FullWidthRow>
  );

  if (isDesktop) {
    return renderLayout(
      <div>
        {children}
        <div className="desktopLayout flex gap-2 relative">
          <div className="sideMenuNav flex flex-col flex-1">
            <div
              className="sideMenuInner sticky ease-in-out duration-700 transition-top"
              style={{ top: navBarHeight + stickyHeroHeight }}
            >
              <RenderNavigation vertical itemClassName="min:h-16 py-4" />
            </div>
          </div>
          <div
            style={{ marginTop: stickyHeroHeight ? 0 : -offsetContent }}
            className="contentInner flex-[3] ease-linear transition-margin duration-200"
          >
            {renderContent}
          </div>
        </div>
      </div>
    );
  }

  return renderLayout(
    <div>
      {children}
      <div className="mobileLayout flex flex-col gap-2 relative">{renderContent}</div>
    </div>
  );
};
