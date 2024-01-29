import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearPosSlice, setShowInvoiceConfirmation } from '../../reducers/PosSlice';
import { ADD_INVOICE } from '../../utils/urls';

export default function InvoiceConfirmation() {
    const cancelButtonRef = useRef(null);

    const dispatch = useDispatch();
    const showInvoiceConfirmation = useSelector((state) => state.pos.showInvoiceConfirmation);
    const invoiceItemList = useSelector((state) => state.pos.invoiceItemList);
    const invoiceSubTotal = useSelector((state) => state.pos.invoiceSubTotal);
    const payment = useSelector((state) => state.pos.payment);
    const user = useSelector((state) => state.auth.user);

    const cancelInvoice = () => {
        dispatch(setShowInvoiceConfirmation(false))
    }



    const saveInvoice = async () => {
        if (invoiceItemList?.length > 0 && invoiceSubTotal > 0 && payment > 0) {
            const headers = {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
            await axios.post(ADD_INVOICE,
                {
                    netTotal: invoiceSubTotal,
                    payment: payment,
                    invoiceItemList: invoiceItemList,
                }
                , { headers: headers })
                .then(function (response) {
                    if (response?.data?.statusCode === 200) {
                        dispatch(clearPosSlice());
                    }

                })
                .catch(function (error) {
                    console.log("Product saving error-- " + error);
                });
        } else { }
    }

    return (
        <Transition.Root show={showInvoiceConfirmation} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => cancelInvoice()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Save Invoice
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                The invoice will be saved to system
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        onClick={saveInvoice}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        onClick={cancelInvoice}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
