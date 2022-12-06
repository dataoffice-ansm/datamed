import type { Publication } from 'graphql/__generated__/generated-documents';
import { useMemo } from 'react';
import PublicationOtherSVG from '../../assets/icons/publications/other.svg';
import PublicationSpeakSVG from '../../assets/icons/publications/speak.svg';
import PublicationInfoSVG from '../../assets/icons/publications/info.svg';
import { Button } from '../../components/Button/Button';

export const PublicationItem = ({ publication }: { publication: Publication }) => {
  const publicationIcon = useMemo(() => {
    switch (publication?.typeId) {
      case 1:
        return <PublicationOtherSVG />;
      case 3:
        return <PublicationSpeakSVG />;
      default:
        return <PublicationInfoSVG />;
    }
  }, [publication?.typeId]);

  return (
    <div className="flex border border-grey-100 bg-white items-stretch">
      <div className="flex items-center w-48 bg-primary-500">
        <div className="h-32 w-32 md:h-48 md:w-48">{publicationIcon}</div>
      </div>
      <div className="px-4 py-8 flex gap-4 flex-col">
        <div className="text-xl font-medium">{publication?.name}</div>
        {publication.link && (
          <Button href={publication.link}>
            <a>{publication.type}</a>
          </Button>
        )}
      </div>
    </div>
  );
};
