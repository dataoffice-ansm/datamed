import { Dialog, Transition } from '@headlessui/react';
import type { HTMLAttributes } from 'react';
import React, { Fragment, useEffect } from 'react';
import { useBodyScrollContext } from '../../contexts/BodyScrollContext';
import CloseSvg from '../../assets/pictos/icons/close.svg';
import classNames from 'classnames';

export const Modal = ({
  isOpen = false,
  onClose = () => null,
  title,
  description,
  children,
  closeClassName,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  onClose?: () => void;
  isOpen?: boolean;
  title?: string;
  description?: string;
  closeClassName?: string;
}) => {
  const { setScrollEnabled } = useBodyScrollContext();

  useEffect(() => {
    setScrollEnabled(!isOpen);
    return () => {
      setScrollEnabled(true);
    };
  }, [isOpen, setScrollEnabled]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose} {...props}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                )}
                {description && <Dialog.Description>{description}</Dialog.Description>}
                <div className="mt-2">{children}</div>

                <div className="mt-4">
                  <button
                    type="button"
                    className={classNames(
                      'bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500',
                      closeClassName
                    )}
                    onClick={onClose}
                  >
                    <CloseSvg className="h-6 w-6" />
                    <span className="sr-only">Fermeture</span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
