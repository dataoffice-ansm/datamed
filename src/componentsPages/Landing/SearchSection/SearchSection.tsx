import { FullWidthRow } from '../../../components/FullWidthRow/FullWidthRow';
import { Autocomplete } from '../../../components/Autocomplete/Autocomplete';
import LandingIllustrationSearch from '../../../assets/landing/landing_illustration_search.svg';

export const SearchSection = () => (
  <FullWidthRow className="bg-background shadow-inner">
    <div
      id="search"
      className="py-32 flex justify-center items-center lg:items-start flex-col-reverse lg:flex-row gap-16 w-full"
    >
      <LandingIllustrationSearch
        className="md:min-w-[320px] lg:min-w-[256px] max-w-md"
        alt="Illustration de microscope et analyse"
      />
      <div className="lg:flex-col flex-col-reverse flex pt-12 gap-4 max-w-3xl">
        <h2 className="lg:pt-8 text-xl lg:text-3xl font-medium">
          Trouvez des données statistiques autour du médicament
        </h2>
        <Autocomplete />
      </div>
    </div>
  </FullWidthRow>
);
