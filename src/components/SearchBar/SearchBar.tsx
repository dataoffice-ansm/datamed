import SearchIcon from '../../icons/search.svg';
import { navIconSize } from '../../config/config';
import { Autocomplete } from '../Autocomplete/Autocomplete';

/**
 *
 * @param handleSearchDrawer
 * @constructor
 */
export const SearchBar = ({ handleSearchDrawer }: { handleSearchDrawer: () => void }) => (
  <>
    <button
      type="button"
      className="md:hidden flex justify-center align-center p-2"
      aria-label="Rechercher"
      onClick={handleSearchDrawer}
    >
      <SearchIcon width={navIconSize} height={navIconSize} alt="search" />
    </button>
    <form className="flex-auto hidden md:block">
      <div className="relative">
        <Autocomplete />
      </div>
    </form>
  </>
);
