import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearPosSlice, setNetTotal, setTotalPayment } from '../../reducers/PosSlice';

export default function Calculator() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const invoiceSubTotal = useSelector((state) => state.pos.invoiceSubTotal);
    const [payment, setPayment] = useState('');
    const [balance, setBalance] = useState(0);

    const handlePaymentChange = (e) => {
        const enteredPayment = parseFloat(e.target.value) || 0;
        setPayment(enteredPayment);

        const calculatedBalance = enteredPayment - invoiceSubTotal;
        setBalance(calculatedBalance);
    };

    const saveInvoice = () => {
        dispatch(setTotalPayment(payment));
        setPayment('');
        setBalance('');
    }

    const clearPos = () => {
        dispatch(clearPosSlice());
        setPayment('');
        setBalance('');
    }

    return (
        <form>
            <div className="space-y-12">

                <div className="p-4 border border-slate-100 rounded-md">

                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

                        <div className="col-span-full">
                            <label htmlFor="pos-sub-total" className="block text-sm font-medium leading-8 text-gray-900">
                                Sub Total
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="pos-sub-total"
                                    id="pos-sub-total"
                                    disabled
                                    value={invoiceSubTotal}
                                    className="h-12 bg-slate-50 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="pos-payment" className="block text-sm font-medium leading-8 text-gray-900">
                                Payment
                            </label>
                            <div className="mt-1 flex flex-col">
                                <input
                                    type="text"
                                    name="pos-payment"
                                    id="pos-payment"
                                    value={payment}
                                    disabled={invoiceSubTotal === 0 || invoiceSubTotal < 0}
                                    onChange={handlePaymentChange}
                                    className="h-12 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {payment === "" ?
                                    <label htmlFor="pos-payment" className=" text-xs font-thin leading-3 text-red-500">
                                        Please enter payment amount
                                    </label>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="pos-balance" className="block text-sm font-medium leading-8 text-gray-900">
                                Balance
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="pos-balance"
                                    id="pos-balance"
                                    disabled
                                    value={balance}
                                    className="h-12 bg-slate-50 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <button
                                type="button"
                                className="rounded-md bg-[#d5e8d4] outline-[#aecfa0] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                onClick={saveInvoice}
                                disabled={payment === ''}
                            >
                                Save Invoice
                            </button>
                            <button
                                type="button"
                                className="ml-1 rounded-md bg-slate-300 outline-[#aecfa0] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                                onClick={clearPos}

                            >
                                Clear Invoice
                            </button>
                        </div>


                    </div>
                </div>


            </div>
        </form>
    )
}
