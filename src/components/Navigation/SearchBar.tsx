import { NAVIGATION_ICON_SIZE } from '../../models/navigation.model';
import SearchIcon from '../../icons/search.svg';
import classnames from 'classnames';

export const SearchBar = () => {
  const ariaLabel = 'Rechercher';
  const iconAlt = 'Logo DATAMED';

  const rwdClassName = classnames('md:hidden flex justify-center align-center p-2');

  const className = classnames(
    'w-full border-grey-400 rounded-lg border focus:border-blue-500 py-2 md:py-3 px-4'
  );

  return (
    <>
      <button type="button" className={rwdClassName} aria-label={ariaLabel}>
        <SearchIcon width={NAVIGATION_ICON_SIZE} height={NAVIGATION_ICON_SIZE} alt={iconAlt} />
      </button>
      <form className="flex-auto hidden md:block">
        <div className="relative">
          <input type="text" className={className} placeholder={ariaLabel} />
          <div className="absolute right-4 bottom-2.5 inset-y-0 pointer-events-none h-full flex justify-center items-center">
            <SearchIcon width={NAVIGATION_ICON_SIZE} height={NAVIGATION_ICON_SIZE} alt={iconAlt} />
          </div>
        </div>
      </form>
    </>
  );
};
