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
    selectedYearOption: string;
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
  const [selectedYearOption, setSelectedYearOption] = useState<string>(
    yearsOptions ? (yearsOptions[0].value as string) : ''
  );

  const [selectedUnitOption, setSelectedUnitOption] = useState<UnitOptionsValue>(defaultOption);

  const onChangeYear = useCallback((optionKey: string) => {
    setSelectedYearOption(optionKey);
  }, []);

  const onChangeUnit = useCallback((optionKey: UnitOptionsValue) => {
    setSelectedUnitOption(optionKey);
  }, []);

  return (
    <div
      className={classNames(
        'GraphBoxSelect p-4',
        !layoutSection && 'rounded-lg shadow bg-white',
        className
      )}
    >
      <div className="GraphBoxHeader flex flex-col px-4">
        <div className="GraphBoxTitle flex flex-col sm:flex-row gap-4 justify-between items-start mb-4">
          <div className="GraphBoxTitle flex items-start gap-2 w-full text-left w-full md:w-2/3">
            <h2
              className={classNames(
                layoutSection && 'text-2xl lg:text-3xl',
                'font-medium text-left mt-0 mb-2'
              )}
            >
              {title}
            </h2>
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
                  theme="secondary-variant"
                  onSelectOption={(index, option) => {
                    onChangeYear(option.value as string);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="GraphBoxSubtitle">
          {subtitle && <h6 className="mt-0 mb-6 text-left">{subtitle}</h6>}
        </div>
      </div>

      {renderHeader}
      <div className="GraphBoxSelectContent m-auto">
        {render({ selectedUnitOption, selectedYearOption })}
      </div>
    </div>
  );
};
