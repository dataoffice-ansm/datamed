import type { SelectOption } from './Select/Select';
import { Select } from './Select/Select';
import type { ReactNode, HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Tooltip } from './Tooltip/Tooltip';
import InfoSVG from '../assets/pictos/icons/info.svg';

const options = {
  percent: { label: 'Pourcentage' },
  number: { label: 'Nombre' },
} as const;

export type OptionsValue = keyof typeof options;

const selectOptions: Array<SelectOption<OptionsValue>> = Object.entries(options).map(([k, v]) => ({
  value: k as OptionsValue,
  ...v,
}));

type GraphFiguresContainerProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  tooltip?: JSX.Element | ReactNode;
  renderHeader?: ReactNode;
  render: (_selectedOption: OptionsValue) => ReactNode;
  defaultOption?: OptionsValue;
  theme?: 'primary' | 'secondary' | 'secondary-variant' | 'gray';
};

const findOptionIndex = (selectedOption: OptionsValue) =>
  (Object.keys(options) as OptionsValue[]).findIndex((option) => option === selectedOption);

/**
 *
 * @param title
 * @param render
 * @param renderHeader
 * @param tooltip
 * @param className
 * @param initialIndex
 * @constructor
 */
export const GraphBoxSelect = ({
  title,
  render,
  renderHeader,
  tooltip,
  className,
  defaultOption = 'number',
  theme = 'secondary',
}: GraphFiguresContainerProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionsValue>(defaultOption);

  const onChange = useCallback((optionKey: OptionsValue) => {
    setSelectedOption(optionKey);
  }, []);

  return (
    <div
      className={classNames('GraphBoxSelect flex-1 shadow rounded-lg bg-white my-8 p-4', className)}
    >
      <div className="flex flex-wrap gap-3 justify-between items-center text-left px-4">
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
            theme={theme}
            defaultOptionIndex={findOptionIndex(defaultOption)}
            options={selectOptions}
            onSelectOption={(index, option) => {
              onChange(option.value as OptionsValue);
            }}
          />
        </div>
      </div>

      {renderHeader}
      <div className="GraphBoxSelectContent m-auto">{render(selectedOption)}</div>
    </div>
  );
};
