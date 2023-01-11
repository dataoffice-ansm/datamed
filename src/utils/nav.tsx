import { type NavLinkItem } from '../config/layoutConfig';
import { NavLink } from '../components/Nav/NavLink';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';

const RenderNavLink = ({
  link,
  mobile = false,
}: {
  link: NavLinkItem;
  // eslint-disable-next-line react/no-unused-prop-types
  active?: boolean;
  mobile?: boolean;
}) => {
  const url = link?.url ?? '#';

  return (
    <NavLink
      key={link.url}
      enableAnimation
      className={classNames(!mobile && 'hidden md:block')}
      href={url}
    >
      {link.title}
    </NavLink>
  );
};

const NavLinkDropdown = ({ link }: { link: NavLinkItem }) => (
  <Menu>
    <Menu.Button>More</Menu.Button>
    <Menu.Items>
      {link?.links &&
        link.links.map((link) => (
          <Menu.Item key={link.url}>
            {({ active }) => <RenderNavLink link={link} active={active} />}
          </Menu.Item>
        ))}
    </Menu.Items>
  </Menu>
);

export const RenderNavLinks = ({ links, mobile }: { links: NavLinkItem[]; mobile?: boolean }) => (
  <>
    {links.map(
      (link) => (
        // link.links ? (
        //   <NavLinkDropdown key={link.url} link={link} />
        // ) : (
        <RenderNavLink key={link.url} link={link} mobile={mobile} />
      )
      // )
    )}
  </>
);
