import type { SelectOption } from './Select';
import { Select } from './Select';
import type { ReactNode, HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { TooltipInformation } from '../componentsPages/Ruptures/Tooltip';

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
  disableUnitSelect?: boolean;
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
  disableUnitSelect,
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
    <div className={classNames('GraphBoxSelect rounded-lg bg-white p-4', className)}>
      <div className="GraphBoxHeader flex gap-4 justify-between items-start px-4 mb-4">
        <div className="GraphBoxTitle flex items-start gap-2 w-full text-left">
          <div className="flex items-start gap-2">
            <span className="text-lg font-medium">{title}</span>
            {tooltip && (
              <TooltipInformation>
                <div className="p-2">{tooltip}</div>
              </TooltipInformation>
            )}
          </div>
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

          {!disableUnitSelect && (
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
          )}
        </div>
      </div>

      {renderHeader}
      <div className="GraphBoxSelectContent m-auto">
        {render({ selectedUnitOption, selectedYearOption })}
      </div>
    </div>
  );
};
