import type { HTMLAttributes, ReactNode } from 'react';
import { type MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import FirstPageSVG from '../assets/pictos/icons/pagination/first.svg';
import LastPageSVG from '../assets/pictos/icons/pagination/last.svg';
import PreviousPageSVG from '../assets/pictos/icons/pagination/previous.svg';
import NextPageSVG from '../assets/pictos/icons/pagination/next.svg';
import { NotEnoughData } from './NotEnoughData';
import { useLayoutContext } from '../contexts/LayoutContext';

export type PaginatedListThemeColor = 'primary' | 'secondary' | 'grey';

export type PaginatedListProps<T> = {
  data: T[];
  listRef?: MutableRefObject<HTMLDivElement | null>;
  renderItem: (_item: T, _index: number) => ReactNode | JSX.Element;
  theme?: PaginatedListThemeColor;
};

const hoverAndFocusFillColor = (theme: PaginatedListThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'hover:fill-primary focus-visible:fill-primary';
    case 'secondary':
      return 'hover:fill-secondary-900 focus-visible:fill-secondary-900';
    default:
      return 'hover:fill-gray focus-visible:fill-gray';
  }
};

const hoverAndFocusBackgroundColor = (theme: PaginatedListThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'hover:bg-primary focus-visible:bg-primary';
    case 'secondary':
      return 'hover:bg-secondary-50 focus-visible:bg-secondary-50';
    default:
      return 'hover:bg-gray focus-visible:bg-gray';
  }
};

const NavigationButton = ({
  disabled,
  onClick,
  children,
  theme = 'primary',
}: {
  disabled: boolean;
  theme?: PaginatedListThemeColor;
} & HTMLAttributes<HTMLButtonElement>) => (
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

export const PaginatedList = <T,>({
  data,
  renderItem,
  listRef,
  theme = 'primary',
}: PaginatedListProps<T>) => {
  const { navBarHeight, stickyHeroHeight } = useLayoutContext();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const sizeOptions = useMemo(() => [5, 10, 25, 50, 100], []);

  const maxPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage]
  );

  const renderedItems = useMemo(() => {
    const trimStart = pageIndex * itemsPerPage;
    const trimEnd = trimStart + itemsPerPage;
    return data.slice(trimStart, trimEnd);
  }, [data, itemsPerPage, pageIndex]);

  const handleSelectPageSize = useCallback((number: number) => {
    setItemsPerPage(number);
  }, []);

  const scrollTopList = useCallback(() => {
    if (listRef?.current) {
      const y =
        (listRef.current.getBoundingClientRect().top ?? 0) +
        window.scrollY -
        (navBarHeight + stickyHeroHeight);
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }, [listRef, navBarHeight, stickyHeroHeight]);

  const handleSelectPage = useCallback(
    (page: number) => {
      setPageIndex(page);
      scrollTopList();
    },
    [scrollTopList]
  );

  const renderPagination = useMemo(
    () => (
      <div className="PaginatedListPaginatorContainer flex flex-wrap gap-2 py-4 items-center">
        <div className="PaginatedListPaginator flex justify-center items-center gap-1">
          <label htmlFor="selectSizePageOption" className="m-0 font-normal">
            Nombre de lignes par page:
          </label>
          <select
            defaultValue={itemsPerPage}
            name="selectSizePageOption"
            onChange={({ target }) => {
              handleSelectPageSize(Number(target.value));
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
        <div className="flex justify-center items-center gap-1">
          <NavigationButton
            disabled={pageIndex === 0}
            onClick={() => {
              handleSelectPage(0);
            }}
          >
            <FirstPageSVG className={classNames('h-6 w-6', hoverAndFocusFillColor(theme))} />
          </NavigationButton>

          <NavigationButton
            disabled={pageIndex === 0}
            onClick={() => {
              handleSelectPage(pageIndex - 1);
            }}
          >
            <PreviousPageSVG className="hover:fill-white h-6 w-6" />
          </NavigationButton>

          <span className="px-2">
            {pageIndex + 1} sur {maxPages}
          </span>

          <NavigationButton
            disabled={pageIndex + 1 === maxPages}
            onClick={() => {
              handleSelectPage(pageIndex + 1);
            }}
          >
            <NextPageSVG className="hover:fill-white h-6 w-6" />
          </NavigationButton>

          <NavigationButton
            disabled={pageIndex + 1 === maxPages}
            onClick={() => {
              handleSelectPage(maxPages - 1);
            }}
          >
            <LastPageSVG className="hover:fill-white h-6 w-6" />
          </NavigationButton>
        </div>
      </div>
    ),
    [handleSelectPage, handleSelectPageSize, itemsPerPage, maxPages, pageIndex, sizeOptions, theme]
  );

  if (!data?.length) {
    return <NotEnoughData />;
  }

  return (
    <div className="PaginatedListContainer">
      <div className="PaginatedListItems flex flex-col rounded-lg border border-grey-100">
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
      {renderPagination}
    </div>
  );
};
