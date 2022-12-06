import type { HTMLAttributes, ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import FirstPageSVG from '../../assets/icons/pagination/first.svg';
import LastPageSVG from '../../assets/icons/pagination/last.svg';
import PreviousPageSVG from '../../assets/icons/pagination/previous.svg';
import NextPageSVG from '../../assets/icons/pagination/next.svg';

export type PaginatedListThemeColor = 'primary' | 'secondary' | 'grey';

export type PaginatedListProps<T> = {
  data: T[];
  renderItem: (_item: T, _index: number) => ReactNode | JSX.Element;
  theme?: PaginatedListThemeColor;
};

const hoverAndFocusFillColor = (theme: PaginatedListThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'hover:fill-primary focus:fill-primary';
    case 'secondary':
      return 'hover:fill-secondary-900 focus:fill-secondary-900';
    default:
      return 'hover:fill-gray focus:fill-gray';
  }
};

const hoverAndFocusBackgroundColor = (theme: PaginatedListThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'hover:bg-primary focus:bg-primary';
    case 'secondary':
      return 'hover:bg-secondary-50 focus:bg-secondary-50';
    default:
      return 'hover:bg-gray focus:bg-gray';
  }
};

/**
 *
 * @param data
 * @param renderItem
 * @param theme
 * @constructor
 */
export const PaginatedList = <T,>({
  data,
  renderItem,
  theme = 'primary',
}: PaginatedListProps<T>) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const sizeOptions = [5, 10, 25, 50, 100];

  const maxPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage]
  );

  const renderedItems = useMemo(() => {
    const trimStart = pageIndex * itemsPerPage;
    const trimEnd = trimStart + itemsPerPage;
    return data.slice(trimStart, trimEnd);
  }, [data, itemsPerPage, pageIndex]);

  const NavigationButton = ({
    disabled,
    onClick,
    children,
  }: { disabled: boolean } & HTMLAttributes<HTMLButtonElement>) => (
    <button
      className={classNames('rounded-[50%]', hoverAndFocusBackgroundColor(theme), {
        'opacity-25 cursor-not-allowed': disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const handleSelectPageSize = useCallback((size: string) => {
    setItemsPerPage(Number(size));
  }, []);

  return (
    <div className="PaginatedListContainer">
      <div className="PaginatedListItems flex flex-col rounded-md border border-grey-100">
        {renderedItems.map((item, index) => (
          <div
            key={`rendered_item_page_${pageIndex}_index_${index.toString()}`}
            className={classNames('PaginatedListItem border-b border-solid border-grey-100 p-3', {
              'border-none': index === renderedItems.length - 1,
            })}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      <div className="PaginatedListPaginatorContainer flex gap-1 py-4">
        <div className="PaginatedListPaginator flex justify-center items-center gap-1">
          <label htmlFor="selectSizePageOption" className="m-0 font-normal">
            Nombre de lignes par page :
          </label>
          <select
            name="selectSizePageOption"
            onChange={({ target }) => {
              handleSelectPageSize(target.value);
            }}
          >
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-auto" />
        <NavigationButton
          disabled={pageIndex === 0}
          onClick={() => {
            setPageIndex(0);
          }}
        >
          <FirstPageSVG className={classNames('h-6 w-6', hoverAndFocusFillColor(theme))} />
        </NavigationButton>

        <NavigationButton
          disabled={pageIndex === 0}
          onClick={() => {
            setPageIndex(pageIndex - 1);
          }}
        >
          <PreviousPageSVG className="hover:fill-secondary h-6 w-6" />
        </NavigationButton>

        <span className="px-2">
          {pageIndex + 1} sur {maxPages}
        </span>

        <NavigationButton
          disabled={pageIndex + 1 === maxPages}
          onClick={() => {
            setPageIndex(pageIndex + 1);
          }}
        >
          <NextPageSVG className="hover:fill-secondary h-6 w-6" />
        </NavigationButton>

        <NavigationButton
          disabled={pageIndex + 1 === maxPages}
          onClick={() => {
            setPageIndex(maxPages);
          }}
        >
          <LastPageSVG className="hover:fill-secondary h-6 w-6" />
        </NavigationButton>
      </div>
    </div>
  );
};
