import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

type CallToActionBaseProps = {
  theme?: 'primary' | 'secondary' | 'grey';
};

type CallToActionLinkProps = CallToActionBaseProps &
  HTMLAttributes<HTMLAnchorElement> & {
    as: 'link';
    externalLink?: boolean;
    href: string;
  };

type CallToActionButtonProps = CallToActionBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as: 'button';
    variant?: 'outlined' | 'contained';
    type?: 'submit' | 'reset' | 'button';
  };

type CallToActionProps = CallToActionButtonProps | CallToActionLinkProps;

const LinkApp = ({
  href,
  theme,
  className,
  children,
}: { href: string; theme: string; children: ReactNode } & HTMLAttributes<HTMLAnchorElement>) => (
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
  if (
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.exec(
      href
    )
  ) {
    return (
      <LinkApp href={href} className={className} theme={theme} {...rest}>
        {children}
      </LinkApp>
    );
  }

  return (
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
      href={href}
    >
      {children}
    </a>
  );
};

CallToAction.defaultProps = {
  as: 'link',
};
