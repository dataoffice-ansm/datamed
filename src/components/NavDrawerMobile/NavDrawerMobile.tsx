import classnames from 'classnames';
import { NavLink } from '../NavLink/NavLink';
import type { HTMLAttributes } from 'react';

/**
 *
 * @param links
 * @param opened
 * @param topFromNavbar
 * @param toggleOverlay
 * @constructor
 */
export const NavDrawerMobile = ({
  links,
  topFromNavbar = 0,
  toggleOverlay,
}: {
  topFromNavbar?: number;
  toggleOverlay: () => void;
  links: Array<{ href: string; text: string }>;
} & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classnames('NavigationMenu fixed left-0 right-0 bottom-0 z-[2]')}
    style={{ top: topFromNavbar }}
    onClick={toggleOverlay}
  >
    <div
      className={classnames(
        'NavigationMenuLinkWrapper h-fit bg-white border-t-2 border-grey-100 flex flex-col justify-center align-center'
      )}
    >
      {links.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.text}
        </NavLink>
      ))}
    </div>
  </div>
);
