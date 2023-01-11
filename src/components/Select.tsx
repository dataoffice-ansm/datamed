import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';
import ChevronSVG from '../assets/pictos/icons/chevron.svg';

export type SelectThemeColor = 'primary' | 'secondary' | 'secondary-variant' | 'gray';

export type SelectOptionValue = string | number;

export type SelectOption<T = SelectOptionValue> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type SelectOptionProps = {
  option: SelectOption;
  theme: SelectThemeColor;
} & HTMLAttributes<HTMLOptionElement>;

type SelectProps = {
  defaultOptionIndex?: number;
  options: SelectOption[];
  disabled?: boolean;
  label?: string;
  theme?: SelectThemeColor;
  // eslint-disable-next-line no-unused-vars
  onSelectOption?: (index: number, option: SelectOption) => void;
} & HTMLAttributes<HTMLSelectElement>;

const backgroundTheme = (theme: SelectThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'bg-primary';
    case 'secondary':
      return 'bg-secondary';
    case 'secondary-variant':
      return 'bg-secondary-variant';
    default:
      return 'bg-grey';
  }
};

export const SelectOptionElement = ({ option, theme }: SelectOptionProps) => (
  <Listbox.Option
    disabled={option.disabled}
    className={({ active, selected }) =>
      classNames(
        'SelectOptionElement relative cursor-default select-none py-2 pl-3 pr-9 list-none',
        active ? 'text-white font-bold' : 'text-grey-900',
        active ? backgroundTheme(theme) : 'bg-white',
        {
          'font-bold': selected,
          'opacity-30': option.disabled,
        }
      )
    }
    value={option}
  >
    {option.label}
  </Listbox.Option>
);

const fillTheme = (theme: SelectThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'fill-primary';
    case 'secondary':
      return 'fill-secondary';
    case 'secondary-variant':
      return 'fill-secondary-variant';
    default:
      return 'fill-grey';
  }
};

const SelectTriggerButton = ({
  children,
  open,
  theme,
}: {
  open: boolean;
  theme: SelectThemeColor;
} & HTMLAttributes<HTMLButtonElement>) => (
  <Listbox.Button className="SelectTrigger relative w-full cursor-default rounded-md border border-grey-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm">
    <span className="flex items-center">
      <span className="block truncate">{children}</span>
    </span>
    <div
      className={classNames(
        'ChevronSelectTrigger h-6 w-6 transform duration-500 rotate-180 absolute right-1 top-1.5 bottom-1 ',
        {
          '-rotate-0': open,
        }
      )}
    >
      <ChevronSVG className={fillTheme(theme)} />
    </div>
  </Listbox.Button>
);

export const Select = ({
  label,
  defaultOptionIndex = 0,
  options,
  disabled = false,
  theme = 'primary',
  onSelectOption,
}: SelectProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultOptionIndex);
  const isDisabled = disabled || options.length === 0;
  const selectedOption = options[selectedIndex];

  const onChange = useCallback(
    (selectedOption: SelectOption) => {
      const index = options.findIndex((v) => v === selectedOption);
      if (onSelectOption) {
        onSelectOption(index, selectedOption);
      }

      setSelectedIndex(index);
    },
    [onSelectOption, options]
  );

  return (
    <div
      className={classNames('Select relative text-left max-w-sm', {
        'opacity-50': isDisabled,
      })}
    >
      <Listbox disabled={isDisabled} defaultValue={selectedOption} onChange={onChange}>
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="SelectLabel text-sm font-medium text-grey-700">
                {label}
              </Listbox.Label>
            )}
            <div className="relative mt-1">
              <SelectTriggerButton open={open} theme={theme}>
                {selectedOption?.label ?? 'Choisissez une option'}
              </SelectTriggerButton>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="p-0 list-none absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                  {options.map((option, index) => (
                    <SelectOptionElement
                      key={`${option.label}${index.toString()}`}
                      option={option}
                      theme={theme}
                    />
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
