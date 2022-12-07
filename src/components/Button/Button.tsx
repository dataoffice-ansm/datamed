import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

type CallToActionBaseProps = {
  theme?: 'primary' | 'secondary' | 'grey';
};

export type CallToActionLinkProps = CallToActionBaseProps &
  HTMLAttributes<HTMLAnchorElement> & {
    as: 'link';
    externalLink?: boolean;
    href: string;
  };

export type CallToActionButtonProps = CallToActionBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as: 'button';
    variant?: 'none' | 'outlined' | 'contained';
    type?: 'submit' | 'reset' | 'button';
  };

type CallToActionProps = CallToActionButtonProps | CallToActionLinkProps;

export const Button = (props: CallToActionProps) => {
  const { id, children, className, theme = 'primary' } = props;

  if (props.as === 'button') {
    const { variant = 'outlined', type = 'button', onClick = () => null } = props;

    return (
      <button
        id={id}
        type={type}
        className={classnames(
          'cursor:pointer py-2 px-4 rounded',
          {
            'text-primary underline': theme === 'primary' && variant === 'none',
            'text-secondary hover:bg-secondary-500 focus:bg-secondary-500':
              theme === 'secondary' && variant === 'none',
            'text-grey hover:bg-grey-500 focus:bg-grey-500': theme === 'grey' && variant === 'none',

            'bg-primary text-white hover:bg-primary-500 focus:bg-primary-500':
              theme === 'primary' && variant === 'contained',
            'bg-secondary-800 text-white hover:bg-secondary focus:bg-secondary':
              theme === 'secondary' && variant === 'contained',
            'bg-grey-800 text-white hover:bg-grey focus:bg-grey':
              theme === 'secondary' && variant === 'contained',

            'bg-grey text-white hover:bg-grey-500': theme === 'grey' && variant === 'contained',
            'border border-primary text-primary hover:bg-primary focus:bg-primary':
              theme === 'primary' && variant === 'outlined',
            'border border-secondary text-secondary hover:bg-secondary focus:bg-secondary':
              theme === 'secondary' && variant === 'outlined',
            'border border-grey text-grey hover:bg-grey focus:bg-grey':
              theme === 'grey' && variant === 'outlined',
          },
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  const { href, externalLink } = props;
  const classAnchor = classnames(
    {
      'underline border-primary text-primary hover:decoration-primary focus:decoration-primary':
        theme === 'primary',
      'text-secondary hover:decoration-secondary focus:decoration-secondary': theme === 'secondary',
      'text-grey hover:decoration-grey focus:decoration-grey': theme === 'grey',
    },
    'hover:font-medium focus:font-medium',
    className
  );

  if (externalLink) {
    return (
      <a id={id} href={href} className={classAnchor}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href}>
      <a id={id} className={classAnchor}>
        {children}
      </a>
    </Link>
  );
};

Button.defaultProps = {
  as: 'link',
};
