import { FullWidthRow } from '../../../components/FullWidthRow';
import { AutocompleteSearch } from '../../../components/AutocompleteSearch';
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
      <div className="flex flex-col lg:pt-12 gap-4 max-w-3xl">
        <h2 className="lg:pt-8 text-2xl md:text-3xl font-medium text-center">
          Trouvez des statistiques autour du médicament
        </h2>
        <AutocompleteSearch />
      </div>
    </div>
  </FullWidthRow>
);
