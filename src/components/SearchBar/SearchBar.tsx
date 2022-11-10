import SearchIcon from '../../icons/search.svg';
import { navIconSize } from '../../config/config';
import { Autocomplete } from '../Autocomplete/Autocomplete';

export const SearchBar = ({ handleSearchDrawer }: { handleSearchDrawer: () => void }) => {
  const ariaLabel = 'Rechercher';
  const iconAlt = 'Logo DATAMED';

  return (
    <>
      <button
        type="button"
        className="md:hidden flex justify-center align-center p-2"
        aria-label={ariaLabel}
        onClick={handleSearchDrawer}
      >
        <SearchIcon width={navIconSize} height={navIconSize} alt={iconAlt} />
      </button>
      <form className="flex-auto hidden md:block">
        <div className="relative">
          <Autocomplete />
          <div className="absolute right-4 bottom-2.5 inset-y-0 pointer-events-none h-full flex justify-center items-center">
            <SearchIcon width={navIconSize} height={navIconSize} alt={iconAlt} />
          </div>
        </div>
      </form>
    </>
  );
};
