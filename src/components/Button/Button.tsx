import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

type CallToActionBaseProps = {
  theme?: 'primary' | 'secondary' | 'grey';
  variant?: 'none' | 'outlined' | 'contained';
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
    type?: 'submit' | 'reset' | 'button';
  };

type CallToActionProps = CallToActionButtonProps | CallToActionLinkProps;

export const Button = (props: CallToActionProps) => {
  const { id, children, className, theme = 'primary', variant = 'outlined' } = props;

  const dataProps = {
    'data-theme': theme,
    'data-variant': variant,
  };

  const computedVariantStyles = classnames('btn cursor:pointer py-2 px-4 rounded', {
    'text-primary underline': theme === 'primary' && variant === 'none',
    'text-secondary hover:bg-secondary-500 focus:bg-secondary-500':
      theme === 'secondary' && variant === 'none',
    'text-grey hover:bg-grey-500 focus:bg-grey-500': theme === 'grey' && variant === 'none',

    'bg-primary text-white hover:bg-primary-500 focus:bg-primary-500':
      theme === 'primary' && variant === 'contained',
    'bg-secondary-800 text-white hover:bg-secondary focus:bg-secondary':
      theme === 'secondary' && variant === 'contained',
    'bg-grey text-white hover:bg-grey-500': theme === 'grey' && variant === 'contained',

    'border border-primary text-primary hover:text-white hover:bg-primary focus:bg-primary':
      theme === 'primary' && variant === 'outlined',
    'border border-secondary text-secondary hover:bg-secondary focus:bg-secondary':
      theme === 'secondary' && variant === 'outlined',
    'border border-grey text-grey hover:bg-grey focus:bg-grey':
      theme === 'grey' && variant === 'outlined',
  });

  if (props.as === 'button') {
    const { type = 'button', onClick = () => null } = props;

    return (
      <button
        id={id}
        type={type}
        className={classnames(computedVariantStyles, className)}
        {...dataProps}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  const { href, externalLink } = props;

  const classAnchor = classnames(computedVariantStyles, 'no-underline', className);

  if (externalLink) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        rel="external noreferrer"
        target="_blank"
        id={id}
        href={href}
        {...dataProps}
        className={classAnchor}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href}>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a id={id} {...dataProps} className={classAnchor}>
        {children}
      </a>
    </Link>
  );
};

Button.defaultProps = {
  as: 'link',
};
