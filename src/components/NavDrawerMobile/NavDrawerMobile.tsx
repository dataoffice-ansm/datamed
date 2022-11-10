import { NavLink } from '../NavLink/NavLink';
import type { HTMLAttributes } from 'react';

export const NavDrawerMobile = ({
  topFromNavbar = 0,
  links,
}: {
  topFromNavbar?: number;
  links: Array<{ href: string; text: string }>;
} & HTMLAttributes<HTMLDivElement>) => (
  <div
    className="NavigationMenu fixed left-0 right-0 bottom-0 z-[2]"
    style={{ top: topFromNavbar }}
  >
    <div className="NavigationMenuLinkWrapper h-fit bg-white border-t-2 border-grey-100 flex flex-col justify-center align-center">
      {links.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.text}
        </NavLink>
      ))}
    </div>
  </div>
);
