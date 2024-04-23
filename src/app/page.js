"use client"
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowRightIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const screens = [
  { title: 'First Screen', content: 'This is the first modal screen content.' },
  { title: 'Second Screen', content: 'This is the second modal screen content.' },
];

export default function Example() {
  const [open, setOpen] = useState(true);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const cancelButtonRef = useRef(null);

  const handleNext = () => {
    setCurrentScreenIndex(Math.min(currentScreenIndex + 1, screens.length - 1));
  };

  const handleBack = () => {
    setCurrentScreenIndex(Math.max(currentScreenIndex - 1, 0));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentScreen = screens[currentScreenIndex];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleClose}>
        {/* ... (Transition.Child for background overlay) */}

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              /* ... (transition properties) */
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    {currentScreen.title}
                  </Dialog.Title>
                  <p className="text-sm text-gray-500">{currentScreen.content}</p>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {currentScreenIndex > 0 && (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1"
                      onClick={handleBack}
                    >
                      Back <ArrowLeftIcon className="h-5 w-5 ml-2" />
                    </button>
                  )}

                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                      ${currentScreenIndex === screens.length - 1 ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'}
                      ${currentScreenIndex === screens.length - 1 ? 'sm:col-start-2' : ''} 
                     `}
                    onClick={currentScreenIndex === screens.length - 1 ? handleClose : handleNext}
                  >
                    {currentScreenIndex === screens.length - 1 ? 'Close' : 'Next'}
                    {currentScreenIndex === screens.length - 1 ? (
                      <XMarkIcon className="h-5 w-5 ml-2" />
                    ) : (
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
