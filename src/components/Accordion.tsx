import type { HTMLAttributes } from 'react';
import SparkSVG from '../assets/pictos/icons/spark.svg';
import ChevronSVG from '../assets/pictos/icons/chevron.svg';
import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';

export type AccordionThemeColor =
  | 'primary'
  | 'secondary'
  | 'secondary-variant'
  | 'grey'
  | 'success'
  | 'warning'
  | 'error';

export type AccordionProps = {
  title: string;
  theme?: AccordionThemeColor;
  disabled?: boolean;
  classNameTitle?: string;
};

const strokeTheme = (theme: AccordionThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'stroke-primary';
    case 'secondary':
      return 'stroke-secondary';
    case 'secondary-variant':
      return 'stroke-secondary-variant';
    case 'success':
      return 'stroke-success';
    case 'warning':
      return 'stroke-warning';
    case 'error':
      return 'stroke-error';
    default:
      return 'stroke-grey';
  }
};

const fillTheme = (theme: AccordionThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'fill-primary';
    case 'secondary':
      return 'fill-secondary';
    case 'secondary-variant':
      return 'fill-secondary-variant';
    case 'success':
      return 'fill-success';
    case 'warning':
      return 'fill-warning';
    case 'error':
      return 'fill-error';
    default:
      return 'fill-grey';
  }
};

export const Accordion = ({
  id,
  children,
  title,
  theme = 'secondary',
  disabled = false,
  classNameTitle = '',
  className,
}: AccordionProps & HTMLAttributes<HTMLDivElement>) => {
  // const enableAutoOpen = forceDefaultOpen ? forceDefaultOpen : !isMobile();
  const enableAutoOpen = false;

  return (
    <div id={id} className={classNames('Accordion bg-white rounded-lg shadow', className)}>
      <Disclosure defaultOpen={enableAutoOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                'AccordionTriggerButton py-4 w-full flex gap-4 px-4 items-center font-medium justify-between',
                { 'opacity-50': disabled }
              )}
              disabled={disabled}
            >
              <div className="AccordionLeftIcon h-8 w-8">
                <SparkSVG className={strokeTheme(theme)} />
              </div>
              <span className={classNames('AccordionTitle text-left flex-1', classNameTitle)}>
                {title}
              </span>
              <div
                className={classNames(
                  'AccordionChevronIcon h-8 w-8 transform duration-500 rotate-180',
                  {
                    '-rotate-0': open,
                  }
                )}
              >
                <ChevronSVG className={fillTheme(theme)} />
              </div>
            </Disclosure.Button>
            <Transition
              enter="transition-all duration-200 ease-in"
              enterFrom="transform opacity-0"
              enterTo="transform h-full opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform h-full opacity-100"
              leaveTo="transform h-0 opacity-0"
            >
              <Disclosure.Panel className="AccordionContent px-8 py-4 border-t-[1px] border-grey-50">
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};
