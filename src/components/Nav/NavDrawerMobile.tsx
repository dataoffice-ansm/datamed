import type { HTMLAttributes } from 'react';
import { type NavLinkItem } from '../../config/layoutConfig';
import { RenderNavLinks } from '../../utils/nav';

export const NavDrawerMobile = ({
  topFromNavbar = 0,
  links,
  handleOnClick,
}: {
  topFromNavbar?: number;
  links: NavLinkItem[];
  handleOnClick?: () => void;
} & HTMLAttributes<HTMLDivElement>) => (
  <div
    className="NavDrawerMobile fixed left-0 right-0 bottom-0 z-[2]"
    style={{ top: topFromNavbar }}
    onClick={() => {
      if (handleOnClick) {
        setTimeout(() => {
          handleOnClick();
        }, 400);
      }
    }}
  >
    <div className="NavigationMenuLinkWrapper h-fit flex flex-col justify-center align-center bg-white border-t border-grey-100">
      <RenderNavLinks mobile links={links} />
    </div>
  </div>
);
