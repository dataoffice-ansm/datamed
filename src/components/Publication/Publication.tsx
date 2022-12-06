import type { Publication } from 'graphql/__generated__/generated-documents';
import { Button } from '../Button/Button';
import { getPublicationIcon } from '../../utils/mapping';

/**
 *
 * @param publication
 * @constructor
 */
export const PublicationItem = ({ publication }: { publication: Publication }) => (
  <div className="flex border border-grey-100 bg-white items-stretch">
    <div className="flex items-center w-48 bg-primary-500">
      <div className="h-32 w-32 md:h-48 md:w-48">
        {getPublicationIcon(publication?.type?.id ?? 0)}
      </div>
    </div>
    <div className="px-4 py-8 flex gap-4 flex-col">
      <div className="text-xl font-medium">{publication?.name}</div>
      {publication.link && (
        <Button externalLink href={publication.link}>
          {publication?.type?.name}
        </Button>
      )}
    </div>
  </div>
);
