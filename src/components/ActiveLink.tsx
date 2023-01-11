import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

/**
 *
 * @param children
 * @param render
 * @param props
 * @constructor
 */
export const ActiveLink = ({
  render,
  ...props
}: LinkProps & {
  render: (_isActive: boolean) => ReactNode;
}) => {
  const router = useRouter();
  const isActive = router.asPath === props.href || router.asPath === props.as;

  return <Link {...props}>{render(isActive)}</Link>;
};
