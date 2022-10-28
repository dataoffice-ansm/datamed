import classnames from 'classnames';
import { NavigationLink } from './NavigationLink';

interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  opened: boolean;
  topFromNavbar?: number;
  toggleOverlay: () => void;
  links: { href: string; text: string }[];
}

export const NavigationMenu = ({
  links,
  opened,
  topFromNavbar,
  toggleOverlay,
}: NavigationMenuProps) => {
  const className = classnames('fixed left-0 right-0 bottom-0 bg-[#00000070] z-[2]', {
    hidden: !opened,
  });

  const menuClassName = classnames(
    {
      'h-0': !opened,
      'h-fit': opened,
    },
    'bg-white border-t-2 border-grey-100 flex flex-col justify-center align-center'
  );

  return (
    <div onClick={toggleOverlay} style={{ top: topFromNavbar + 'px' }} className={className}>
      <div className={menuClassName}>
        {links.map((link, index) => (
          <NavigationLink key={index} href={link.href}>
            {link.text}
          </NavigationLink>
        ))}
      </div>
    </div>
  );
};
