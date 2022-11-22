import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

type CallToActionBaseProps = {
  theme?: 'primary' | 'secondary' | 'grey';
};

type CallToActionLinkProps = CallToActionBaseProps &
  HTMLAttributes<HTMLAnchorElement> & {
    as: 'link';
    href: string;
  };

type CallToActionButtonProps = CallToActionBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as: 'button';
    variant?: 'outlined' | 'contained';
    type?: 'submit' | 'reset' | 'button';
  };

type CallToActionProps = CallToActionButtonProps | CallToActionLinkProps;

export const CallToAction = (props: CallToActionProps) => {
  const { theme = 'primary' } = props;

  if (props.as === 'button') {
    const { variant = 'outlined', children, className, type = 'button', ...rest } = props;

    return (
      <button
        {...rest}
        type={type}
        className={classnames(
          {
            'bg-primary text-white hover:bg-primary-500 focus:bg-primary-500':
              theme === 'primary' && variant === 'contained',
            'bg-secondary-800 text-white hover:bg-secondary focus:bg-secondary':
              theme === 'secondary' && variant === 'contained',
            'bg-grey text-white hover:bg-grey-500': theme === 'grey' && variant === 'contained',
            'border border-primary text-primary hover:bg-primary focus:bg-primary':
              theme === 'primary' && variant === 'outlined',
            'border border-secondary text-secondary hover:bg-secondary focus:bg-secondary':
              theme === 'secondary' && variant === 'outlined',
            'border border-grey text-grey hover:bg-grey focus:bg-grey':
              theme === 'grey' && variant === 'outlined',
          },
          'cursor:pointer py-2 px-4 rounded hover:text-white focus:text-white',
          className
        )}
      >
        {children}
      </button>
    );
  }

  const { href, children, className, ...rest } = props;
  return (
    <Link {...rest} href={href}>
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

CallToAction.defaultProps = {
  as: 'link',
};
