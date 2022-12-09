import type { SelectOption, SelectOptionValue } from './Select/Select';
import { Select } from './Select/Select';
import type { ReactNode, HTMLAttributes } from 'react';
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Tooltip } from './Tooltip/Tooltip';
import InfoSVG from '../assets/icons/info/info.svg';

const options: SelectOption[] = [
  {
    label: 'Pourcentage',
    value: 'percent',
  },
  {
    label: 'Nombre',
    value: 'number',
  },
];

type GraphFiguresContainerProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  tooltip?: JSX.Element | ReactNode;
  renderHeader?: ReactNode;
  render: (_selectedOption: SelectOptionValue) => ReactNode;
};

/**
 *
 * @param title
 * @param renderHeader
 * @param tooltip
 * @param className
 * @constructor
 */
export const GraphBoxSelect = ({
  title,
  render,
  renderHeader,
  tooltip,
  className,
}: GraphFiguresContainerProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedOption = options[selectedIndex].value;

  const onChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div
      className={classNames('GraphBoxSelect flex-1 shadow rounded-lg bg-white my-8 p-4', className)}
    >
      <div className="flex flex-wrap gap-3 justify-between items-center gap-3 text-left px-4">
        <div className="GraphBoxTitle flex items-center font-medium">
          <span>{title}</span>
          {tooltip && (
            <div className="GraphBoxTooltip flex justify-center items-center">
              <Tooltip
                content={<div className="p-2">{tooltip}</div>}
                placement="auto-start"
                render={(refCb) => (
                  <div ref={refCb} className="h-5 w-5">
                    <InfoSVG />
                  </div>
                )}
              />
            </div>
          )}
        </div>

        <div className="GraphFiguresContainerSelect max-w-xs">
          <Select
            theme="secondary"
            defaultOptionIndex={selectedIndex}
            options={options}
            onSelectOption={onChange}
          />
        </div>
      </div>

      {renderHeader}
      <div className="GraphBoxSelectContent m-auto">{render(selectedOption)}</div>
    </div>
  );
};
