import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button/Button';

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
  source?: string;
}) => (
  <div
    className={classnames(
      'CardWithImage',
      'w-full lg:flex pt-6 lg:pt-0 border border-grey-100',
      className
    )}
  >
    <div className="flex-none m-auto w-full w-56 lg:w-72 overflow-hidden">{image}</div>
    <div className="flex flex-col p-4">
      <div className="text-md lg:text-xl font-medium">{title}</div>
      <div className="description flex flex-col xl:flex-row gap-8 mt-4 mb-8 text-base lg:text-md">
        <span>{description}</span>
        {source && (
          <span>
            <span className="font-medium">Source des données :</span>
            {source}
          </span>
        )}
      </div>
      <Button href={href}>Découvrir les données</Button>
    </div>
  </div>
);
