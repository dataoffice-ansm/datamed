import type { Publication } from 'graphql/__generated__/generated-documents';
import { getPublicationIcon } from '../../utils/iconsMapping';

/**
 *
 * @param publication
 * @constructor
 */
export const PublicationItem = ({ publication }: { publication: Publication }) => (
  <div className="PublicationItem flex shadow rounded-lg bg-white items-stretch">
    <div className="flex justify-center items-center w-48 bg-primary-500 rounded-l-lg ">
      <div className="h-32 w-32 md:h-48 md:w-48 flex justify-center items-center">
        {getPublicationIcon(publication?.type?.id ?? 0)}
      </div>
    </div>
    <div className="px-4 py-8 flex gap-4 flex-col">
      <div className="sm:text-xl font-medium">{publication?.name}</div>
      {publication.link && (
        <a rel="external noreferrer" target="_blank" href={publication.link}>
          {publication?.type?.name}
        </a>
      )}
    </div>
  </div>
);
