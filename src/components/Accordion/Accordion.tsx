import type { HTMLAttributes, ReactNode } from 'react';
import BlueSparkSVG from '../../assets/icons/spark_blue.svg';
import BlueChevronSVG from '../../assets/icons/chevron_blue.svg';
import { Disclosure, Transition } from '@headlessui/react';
import classnames from 'classnames';

export type AccordionProps = {
  title: string;
  defaultOpen?: boolean;
  icon?: ReactNode;
  chevronIcon?: ReactNode;
};

export const Accordion = ({
  id,
  children,
  title,
  defaultOpen = false,
  icon,
  chevronIcon,
}: AccordionProps & HTMLAttributes<HTMLDivElement>) => (
  <div id={id} className="Accordion bg-white border border-grey-200 rounded-lg">
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="AccordionTriggerButton py-4 w-full flex gap-4 px-4 items-center font-medium justify-between">
            <div className="AccordionLeftIcon h-8 w-8">{icon ?? <BlueSparkSVG />}</div>
            <span className="AccordionTitle text-left flex-1">{title}</span>
            <div
              className={classnames(
                'AccordionChevronIcon h-8 w-8 transform duration-500 rotate-180',
                {
                  '-rotate-0': open,
                }
              )}
            >
              {chevronIcon ?? <BlueChevronSVG />}
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
            <Disclosure.Panel className="AccordionContent px-8 py-4 border-t-[1px] border-grey-200">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  </div>
);
