import type { LinkProps } from 'next/link';
import { ActiveLink } from '../ActiveLink/ActiveLink';
import type { HTMLAttributes } from 'react';
import classNames from 'classnames';

/**
 *
 * @param children
 * @param href
 * @param className
 * @param enableAnimation
 * @constructor
 */
export const NavLink = ({
  children,
  href,
  className,
  enableAnimation,
}: HTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    enableAnimation?: boolean;
  }) => (
  <ActiveLink
    href={href}
    render={(isActive) => (
      <a
        className={classNames(
          'navbarLink group no-underline border-l-4 border-transparent',
          className,
          isActive
            ? 'hover:text-primary focus:text-primary border-primary md:border-none'
            : 'hover:text-primary-700 focus:text-primary-700'
        )}
      >
        <div className="block px-6 py-2">{children}</div>
        {enableAnimation && (
          <div
            className={classNames(
              'navbarLinkBottom',
              'bg-primary-00 h-[2px] text-center m-auto',
              'transition-all duration-200 ease-in-out',
              isActive
                ? 'isActive w-full bg-primary'
                : 'isNotActive w-0 group-hover:w-full bg-primary-700'
            )}
          />
        )}
      </a>
    )}
  />
);
