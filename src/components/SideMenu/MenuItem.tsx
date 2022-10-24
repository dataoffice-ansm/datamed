import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { Link } from 'react-scroll';

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id: string;
}

export function MenuItem({ children, id }: MenuItemProps) {
  return (
    <Link
      activeClass={classnames('text-black', 'active')}
      to={id}
      spy={true}
      smooth={true}
      duration={200}
    >
      {children}
    </Link>
  );
}
