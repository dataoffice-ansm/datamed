import { FullWidthRow } from '../FullWidthRow';
import LandingIllustrationSearch from '../../assets/images/landing_illustration_search.svg';

export const SearchSection = () => {
  return (
    <FullWidthRow className="bg-secondary-light shadow-inner">
      <div className="pt-32 pb-32 flex justify-center items-center lg:items-start flex-col-reverse lg:flex-row gap-16">
        <LandingIllustrationSearch
          className="max-w-xs"
          alt="Illustration de microscope et analyse"
        />
        <div id="search" className="lg:flex-col flex-col-reverse flex pt-12 gap-12 max-w-xl">
          <h2 className="lg:pt-8 text-xl lg:text-3xl font-medium">
            Trouvez des données statistiques autour du médicament à partir du nom du médicament ou
            de la substance active.
          </h2>
          <input
            role="search"
            className="p-2 rounded-lg border-grey-200 border-2"
            type="text"
            placeholder="Rechercher"
          />
        </div>
      </div>
    </FullWidthRow>
  );
};
