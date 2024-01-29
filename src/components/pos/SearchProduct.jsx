import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SEARCH_PRODUCT_BY_ID } from '../../utils/urls';
import { addInvoiceItem } from '../../reducers/PosSlice';

export default function SearchProduct() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [prId, setPrId] = useState();
    const [qty, setQty] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [prName, setPrName] = useState('');
    const [showQtyError, setShowQtyError] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (prId !== '') {
                performSearch();
            }
        }
    };

    const performSearch = async () => {
        await axios.get(SEARCH_PRODUCT_BY_ID + prId, { headers: { "Authorization": `Bearer ${user?.token}` } })
            .then(function (response) {
                if (response?.data?.statusCode === 200) {
                    setSelectedProduct(response?.data?.data);
                    setPrName(response?.data?.data?.productName);
                    setSellingPrice(response?.data?.data?.productStock?.sellingPrice);
                }

            })
            .catch(function (error) {
                console.log("All products error-- " + error);
            });
    };

    const addItemsToInvoice = () => {
        if (qty > 0) {
            dispatch(addInvoiceItem(
                {
                    itemQty: qty,
                    itemPrice: sellingPrice,
                    subTotal: qty * sellingPrice,
                    productName: prName,
                    productStockId: selectedProduct?.productStock?.productStockId
                }
            ));
            clearFields();
        } else {
            setShowQtyError(true)
        }
    }
    const clearFields = () => {
        setSelectedProduct(null);
        setPrId(0);
        setQty(0);
        setSellingPrice(0);
        setPrName('');
        setShowQtyError(false)
    }



    return (
        <div className="flex items-center justify-center p-4  rounded-md px-10">
            <div className="grid sm:grid-cols-1 lg:grid-cols-11 gap-x-3 border-gray-100 gap-y-3 border p-4 rou3">
                <div className="sm:col-span-3 flex flex-row">
                    <label htmlFor="pos-search-by" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                        Search Product
                    </label>
                    <input
                        type="text"
                        name="pos-search-by"
                        id="pos-search-by"
                        autoComplete="given-name"
                        value={prId}
                        placeholder="Press Enter to search"
                        onChange={(e) => setPrId(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="sm:col-span-2 flex flex-row">
                    <label htmlFor="pos-product-name" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                        Pr Name
                    </label>
                    <input
                        type="text"
                        name="pos-product-id"
                        id="pos-product-name"
                        disabled
                        value={prName}
                        className="bg-slate-100 basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="sm:col-span-2 flex flex-row">
                    <label htmlFor="pos-product-qty" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                        Qty
                    </label>
                    <div className='basis-3/4 flex flex-col'>
                        <input
                            type="number"
                            name="pos-product-qty"
                            id="pos-product-qty"
                            value={qty}
                            disabled={selectedProduct === null}
                            onChange={(e) => { setQty(e.target.value); setShowQtyError(false) }}
                            className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {showQtyError ?
                            <label className="basis-1/4 block text-sm font-medium leading-3 text-red-500">
                                Please add Qunatity
                            </label>
                            : <></>}
                    </div>

                </div>
                <div className="sm:col-span-2 flex flex-row justify-end">
                    <label htmlFor="pos-product-selling-price" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                        Selling Price
                    </label>
                    <input
                        type="text"
                        name="pos-product-selling-price"
                        id="pos-product-selling-price"
                        disabled
                        value={sellingPrice}
                        className="bg-slate-100 basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="sm:col-span-2 flex flex-row justify-end lg:justify-center">
                    <button
                        type="submit"
                        className="rounded-md w-36 bg-[#a9a2a1] outline-[#a9a2a1] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        onClick={addItemsToInvoice}
                        disabled={selectedProduct === null}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>

    );
}