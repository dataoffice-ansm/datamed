import { NotEnoughData } from './NotEnoughData';
import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import classnames from 'classnames';

type GraphFiguresContainerProps<T> = HTMLAttributes<HTMLDivElement> & {
  data: T[];
  renderItem: (_item: T) => ReactNode | JSX.Element;
};

/**
 *
 * @param data
 * @param renderItem
 * @constructor
 */
export const GraphFiguresGrid = <T,>({ data, renderItem }: GraphFiguresContainerProps<T>) => {
  const grid = classnames(
    'grid',
    data.length === 1 ? 'grid-cols-1' : 'grid-cols-2',
    'md:grid-cols-3 xl:grid-cols-4'
  );

  return (
    <div className="GraphFiguresGrid w-full">
      {data.length ? (
        <div className={classnames(grid, 'gap-8 m-auto mt-8 p-1 md:p-4')}>
          {data.map((item, index) => (
            <div key={`graphFigureIndex_${index.toString()}`} className="flex justify-center">
              {renderItem(item)}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};
