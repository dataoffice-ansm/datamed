import { FullWidthRow } from '../../../components/FullWidthRow/FullWidthRow';
import { Autocomplete } from '../../../components/Autocomplete/Autocomplete';
import LandingIllustrationSearch from '../../../assets/images/landing_illustration_search.svg';

export const SearchSection = () => (
  <FullWidthRow className="bg-secondary-light shadow-inner">
    <div
      id="search"
      className="py-32 flex justify-center items-center lg:items-start flex-col-reverse lg:flex-row gap-16 w-full"
    >
      <LandingIllustrationSearch className="max-w-xs" alt="Illustration de microscope et analyse" />
      <div className="lg:flex-col flex-col-reverse flex pt-12 gap-4 max-w-3xl">
        <h2 className="lg:pt-8 text-xl lg:text-3xl font-medium">
          Trouvez des données statistiques autour du médicament à partir du nom du médicament ou de
          la substance active.
        </h2>
        <Autocomplete />
      </div>
    </div>
  </FullWidthRow>
);
