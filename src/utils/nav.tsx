import { type NavLinkItem } from '../config/layoutConfig';
import { NavLink } from '../components/Nav/NavLink';
import { Menu } from '@headlessui/react';
import { isMobile } from './web';

const RenderNavLink = ({ link }: { link: NavLinkItem; active?: boolean }) => {
  const url = link?.url ?? '#';

  return isMobile() ? (
    <NavLink key={link.url} href={url}>
      {link.title}
    </NavLink>
  ) : (
    <NavLink key={link.url} enableAnimation className="hidden md:block" href={url}>
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

export const RenderNavLinks = ({ links }: { links: NavLinkItem[] }) => (
  <>
    {links.map(
      (link) => (
        // link.links ? (
        //   <NavLinkDropdown key={link.url} link={link} />
        // ) : (
        <RenderNavLink key={link.url} link={link} />
      )
      // )
    )}
  </>
);
