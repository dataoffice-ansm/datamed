import SearchIcon from '../assets/nav/search.svg';
import { Autocomplete } from './Autocomplete/Autocomplete';
import { navIconSize } from '../config/layoutConfig';

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
      <SearchIcon className="w-8 h-8" alt="search" />
    </button>
    <form className="flex-auto hidden md:block">
      <div className="relative">
        <Autocomplete />
      </div>
    </form>
  </>
);
