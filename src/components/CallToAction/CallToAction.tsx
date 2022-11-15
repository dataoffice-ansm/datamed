import type { HTMLAttributes } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

type CtaType = {
  theme: 'primary' | 'secondary' | 'grey';
};

type LinkCta = CtaType &
  HTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonCta = CtaType &
  HTMLAttributes<HTMLButtonElement> & {
    variant?: 'outlined' | 'contained';
    role?: 'submit' | 'reset' | 'button';
    onClick: () => void;
  };

type Cta = ButtonCta | LinkCta;

export const CallToAction = ({
  as = 'link',
  className,
  children,
  theme = 'primary',
  ...props
}: { as?: 'link' | 'button' } & Cta) => {
  if (as === 'button') {
    const { onClick, role = 'button', variant = 'outlined' } = props as ButtonCta;
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={role}
        className={classnames(
          {
            'bg-primary text-white hover:bg-primary-500 focus:bg-primary-500':
              theme === 'primary' && variant === 'contained',
            'bg-secondary-800 text-white hover:bg-secondary focus:bg-secondary':
              theme === 'secondary' && variant === 'contained',
            'bg-grey text-white hover:bg-grey-500': theme === 'grey' && variant === 'contained',
            'border border-primary text-primary hover:bg-primary focus:bg-primary':
              theme === 'primary' && variant === 'outlined',
            'border-secondary text-secondary hover:bg-secondary focus:bg-secondary':
              theme === 'secondary' && variant === 'outlined',
            'border-grey text-grey hover:bg-grey focus:bg-grey':
              theme === 'grey' && variant === 'outlined',
          },
          'cursor:pointer py-2 px-4 rounded hover:text-white focus:text-white',
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  const { href } = props as LinkCta;
  return (
    <Link href={href}>
      <a
        className={classnames(
          {
            'underline border-primary text-primary hover:decoration-primary focus:decoration-primary':
              theme === 'primary',
            'text-secondary hover:decoration-secondary focus:decoration-secondary':
              theme === 'secondary',
            'text-grey hover:decoration-grey focus:decoration-grey': theme === 'grey',
          },
          'hover:font-medium focus:font-medium',
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
};
