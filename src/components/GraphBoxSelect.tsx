import type { SelectOption } from './Select';
import { Select } from './Select';
import type { ReactNode, HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Tooltip } from './Tooltip/Tooltip';
import InfoSVG from '../assets/pictos/icons/info.svg';

const options = {
  percent: { label: 'Pourcentage' },
  number: { label: 'Nombre' },
} as const;

export type UnitOptionsValue = keyof typeof options;

const selectOptions: Array<SelectOption<UnitOptionsValue>> = Object.entries(options).map(
  ([k, v]) => ({
    value: k as UnitOptionsValue,
    ...v,
  })
);

type GraphFiguresContainerProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  tooltip?: JSX.Element | ReactNode;
  renderHeader?: ReactNode;
  yearsOptions?: SelectOption[];
  render: ({
    // eslint-disable-next-line no-unused-vars
    selectedUnitOption,
    // eslint-disable-next-line no-unused-vars
    selectedYearOption,
  }: {
    selectedUnitOption: UnitOptionsValue;
    selectedYearOption: number;
  }) => ReactNode;
  defaultOption?: UnitOptionsValue;
  theme?: 'primary' | 'secondary' | 'secondary-variant' | 'gray';
};

const findOptionIndex = (selectedOption: UnitOptionsValue) =>
  (Object.keys(options) as UnitOptionsValue[]).findIndex((option) => option === selectedOption);

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
  yearsOptions,
  defaultOption = 'number',
  theme = 'secondary',
}: GraphFiguresContainerProps) => {
  const [selectedYearOption, setSelectedYearOption] = useState<number>(
    yearsOptions ? (yearsOptions[0].value as number) : 0
  );
  const [selectedUnitOption, setSelectedUnitOption] = useState<UnitOptionsValue>(defaultOption);

  const onChangeYear = useCallback((optionKey: number) => {
    setSelectedYearOption(optionKey);
  }, []);

  const onChangeUnit = useCallback((optionKey: UnitOptionsValue) => {
    setSelectedUnitOption(optionKey);
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
                  <div ref={refCb} className="h-6 w-6">
                    <InfoSVG />
                  </div>
                )}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {yearsOptions && (
            <div className="GraphFiguresContainerSelect max-w-xs">
              <Select
                options={yearsOptions}
                theme="secondary-variant"
                onSelectOption={(index, option) => {
                  onChangeYear(option.value as number);
                }}
              />
            </div>
          )}

          <div className="GraphFiguresContainerSelect max-w-xs">
            <Select
              theme={theme}
              defaultOptionIndex={findOptionIndex(defaultOption)}
              options={selectOptions}
              onSelectOption={(index, option) => {
                onChangeUnit(option.value as UnitOptionsValue);
              }}
            />
          </div>
        </div>
      </div>

      {renderHeader}
      <div className="GraphBoxSelectContent m-auto">
        {render({ selectedUnitOption, selectedYearOption })}
      </div>
    </div>
  );
};
