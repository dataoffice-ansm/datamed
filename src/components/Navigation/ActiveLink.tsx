import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type ActiveLinkProps = LinkProps & {
  children: ReactNode;
  activeClassName: string;
  className: string;
};

export const ActiveLink = ({
  children,
  className,
  activeClassName,
  ...props
}: ActiveLinkProps) => {
  const router = useRouter();

  const classNames =
    router.asPath === props.href || router.asPath === props.as
      ? `${className} ${activeClassName}`.trim()
      : className;

  return (
    <Link {...props}>
      <a className={classNames}>{children}</a>
    </Link>
  );
};
