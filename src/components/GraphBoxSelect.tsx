import type { SelectOption } from './Select';
import { Select } from './Select';
import type { ReactNode, HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { TooltipInformation } from './TooltipInformation';

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
  subtitle?: string;
  layoutSection?: boolean;
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
    selectedYearOption: number | null;
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
  subtitle,
  render,
  renderHeader,
  layoutSection,
  tooltip,
  className,
  yearsOptions,
  disableUnitSelect,
  defaultOption = 'number',
  theme = 'secondary',
}: GraphFiguresContainerProps) => {
  const [selectedYearOption, setSelectedYearOption] = useState<number | null>(
    yearsOptions && yearsOptions.length > 0 ? (yearsOptions[0].value as number) : null
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
      className={classNames(
        'GraphBoxSelect p-2 sm:p-4',
        !layoutSection && 'rounded-lg shadow bg-white',
        className
      )}
    >
      <div className="GraphBoxSelectHeader flex flex-col px-2 sm:px-4">
        <div className="GraphBoxSelectTitle flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-start">
          <div className="inner flex items-start gap-2 w-full text-left w-full md:w-2/3">
            <span
              className={classNames(
                layoutSection && 'font-medium text-2xl',
                'font-medium text-left mt-0 sm:mb-2'
              )}
            >
              {title}
            </span>
            {tooltip && (
              <TooltipInformation>
                <div className="p-2">{tooltip}</div>
              </TooltipInformation>
            )}
          </div>

          <div className="flex gap-2">
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
            {yearsOptions && (
              <div className="GraphFiguresContainerSelect max-w-xs">
                <Select
                  options={yearsOptions}
                  theme={theme}
                  onSelectOption={(index, option) => {
                    onChangeYear(option.value as number);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="GraphBoxSubtitle">
          {subtitle && <h6 className="mt-0 mb-6 font-normal text-left">{subtitle}</h6>}
        </div>
      </div>

      {renderHeader}
      <div className="GraphBoxSelectContent m-auto">
        {render({ selectedUnitOption, selectedYearOption })}
      </div>
    </div>
  );
};
