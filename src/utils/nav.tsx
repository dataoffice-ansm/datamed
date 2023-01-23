import { type NavLinkItem } from '../config/layoutConfig';
import { NavLink } from '../components/Nav/NavLink';
import classNames from 'classnames';

const RenderNavLink = ({ link, mobile = false }: { link: NavLinkItem; mobile?: boolean }) => {
  const url = link?.url ?? '';

  return (
    <NavLink
      key={link.url}
      enableAnimation={!mobile}
      className={classNames(!mobile && 'hidden md:block')}
      href={url}
    >
      {link.title}
    </NavLink>
  );
};

// TODO
// const NavLinkDropdown = ({ link }: { link: NavLinkItem }) => (
//   <Menu>
//     <Menu.Button>More</Menu.Button>
//     <Menu.Items>
//       {link?.links &&
//         link.links.map((link) => (
//           <Menu.Item key={link.url}>{() => <RenderNavLink link={link} />}</Menu.Item>
//         ))}
//     </Menu.Items>
//   </Menu>
// );

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
