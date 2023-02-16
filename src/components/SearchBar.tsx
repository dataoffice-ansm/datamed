import SearchIcon from '../assets/nav/search.svg';
import { AutocompleteSearch } from './AutocompleteSearch';
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
      <SearchIcon className="w-6 h-6" alt="search" />
    </button>
    <form className="flex-auto hidden md:block lg:min-w-[22rem] max-w-2xl">
      <AutocompleteSearch />
    </form>
  </>
);
