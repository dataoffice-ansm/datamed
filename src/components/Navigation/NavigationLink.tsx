import { LinkProps } from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { ActiveLink } from './ActiveLink';

export const NavigationLink = ({
  children,
  href,
  className,
}: React.HTMLAttributes<HTMLAnchorElement> & LinkProps) => {
  const { asPath } = useRouter();

  const navbarLinkClassName = classnames(
    'px-8 py-4 md:py-2 border-l-4 md:border-l-0 md:border-b-4',
    'hover:border-primary-100 hover:text-primary-100',
    'focus:border-primary-100 focus:text-primary-100',
    { 'border-white': asPath !== href },
    className
  );

  return (
    <ActiveLink
      className={navbarLinkClassName}
      href={href}
      activeClassName="text-primary border-primary"
    >
      {children}
    </ActiveLink>
  );
};
