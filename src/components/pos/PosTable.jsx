import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromList } from '../../reducers/PosSlice';

export default function PosTable() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const invoiceItemList = useSelector((state) => state.pos.invoiceItemList);

    const removeItemFromInvoiceItemsList = (item) => {
        dispatch(removeItemFromList(item))
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full divide-y divide-gray-300 rounded-md">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            ID
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Qty
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Selling Price
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Total
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {invoiceItemList.map((item, index) => (
                        <tr key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {item?.productStockId}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.productName}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.itemQty}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.itemPrice}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.subTotal}</td>

                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 ">
                                <button className="ml-4 text-white hover:text-gray-300 bg-red-300 hover:bg-red-400 px-4 py-0.5 rounded-md"
                                    onClick={() => removeItemFromInvoiceItemsList(item)}
                                >
                                    Delete<span className="sr-only">, {item?.productStockId}</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}