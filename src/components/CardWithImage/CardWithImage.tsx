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
  <div className={classnames('CardWithImage', 'w-full lg:flex border border-grey-100', className)}>
    <div className="h-auto w-full lg:w-96 flex-none overflow-hidden">
      <div className="h-full">{image}</div>
    </div>
    <div className="p-8">
      <div className="flex flex-col">
        <div className="text-xl font-medium">{title}</div>
        <div className="mt-4 mb-8 flex flex-col xl:flex-row gap-8">
          <div>{description}</div>
          {source && (
            <div>
              <span className="font-me dium">Source des données :</span> {source}
            </div>
          )}
        </div>
      </div>
      <Button href={href}>Découvrir les données</Button>
    </div>
  </div>
);
