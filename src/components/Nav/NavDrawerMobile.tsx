import type { HTMLAttributes } from 'react';
import { type NavLinkItem } from '../../config/layoutConfig';
import { RenderNavLinks } from '../../utils/nav';

export const NavDrawerMobile = ({
  topFromNavbar = 0,
  links,
}: {
  topFromNavbar?: number;
  links: NavLinkItem[];
} & HTMLAttributes<HTMLDivElement>) => (
  <div
    className="NavigationMenu fixed left-0 right-0 bottom-0 z-[2]"
    style={{ top: topFromNavbar }}
  >
    <div className="NavigationMenuLinkWrapper h-fit bg-white border-t-2 border-grey-100 flex flex-col justify-center align-center">
      <RenderNavLinks links={links} />
    </div>
  </div>
);
