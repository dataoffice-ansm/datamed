import Link from 'next/link';
import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

/**
 *
 * @param className
 * @param image
 * @param title
 * @param description
 * @param href
 * @param source
 * @constructor
 */
export const CardWithImage = ({
  className,
  image,
  title,
  description,
  href,
  source,
}: HTMLAttributes<HTMLDivElement> & {
  image: ReactNode;
  title: string;
  description: string;
  href: string;
  source: string;
}) => (
  <div className={classnames('CardWithImage', 'w-full lg:flex border border-grey-100', className)}>
    <div className="h-auto w-full lg:w-96 flex-none overflow-hidden">
      <div className="h-full">{image}</div>
    </div>
    <div className="p-8">
      <div className="flex flex-col">
        <div className="text-xl font-medium">{title}</div>
        <div className="mt-4 mb-8 flex flex-col xl:flex-row gap-8">
          <div>{description}</div>
          <div>
            <span className="font-medium">Source des données :</span> {source}
          </div>
        </div>
      </div>
      <Link href={href}>
        <a className="text-primary  hover:text-primary-100  focus:text-primary-100">
          Découvrir les données
        </a>
      </Link>
    </div>
  </div>
);