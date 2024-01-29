import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ADD_PRODUCT, UPDATE_PRODUCT } from '../../utils/urls';
import { addProduct, clearEditableProduct, updateProductsArray } from '../../reducers/ProductsSlice';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function AddNewProduct() {
    const categories = useSelector((state) => state.categories.categories);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImgPath, setProductImgPath] = useState('');
    const [sellingPrice, setSellingPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [unitOfMeasure, setUnitOfMeasure] = useState('');
    const [packSize, setPackSize] = useState(0);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const editableProduct = useSelector((state) => state.products.editableProduct);
    const isProductEditClicked = useSelector((state) => state.products.isProductEditClicked);

    const clearFileds = () => {
        setProductName('');
        setProductDescription('');
        setProductImgPath('');
        setSellingPrice(0);
        setQty(0);
        setUnitOfMeasure('');
        setPackSize(0);
        setSelectedCategoryId(0);
        setShowErrorMessage(false);
        if (Object.keys(editableProduct).length > 0) {
            dispatch(clearEditableProduct());
        }
    }

    const loadEditableProductDetails = () => {
        if (Object.keys(editableProduct).length > 0) {
            setProductName(editableProduct?.productName);
            setProductDescription(editableProduct?.productDescription);
            setProductImgPath(editableProduct?.productImgPath);
            setSellingPrice(editableProduct?.productStock?.sellingPrice);
            setQty(editableProduct?.productStock?.qty);
            setUnitOfMeasure(editableProduct?.productStock?.unitOfMeasure);
            setPackSize(editableProduct?.productStock?.packSize);
            setSelectedCategoryId(editableProduct?.categoryId);
        }
    }

    const saveNewProduct = async () => {
        if (productName !== '' && productDescription !== '' && productImgPath !== '' && sellingPrice > 0 && qty > 0 && unitOfMeasure !== '' && packSize > 0 && selectedCategoryId > 0) {
            const headers = {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
            await axios.post(ADD_PRODUCT,
                {
                    productName: productName,
                    productDescription: productDescription,
                    productImgPath: productImgPath,
                    categoryId: selectedCategoryId,
                    productStock: {
                        sellingPrice: sellingPrice,
                        qty: qty,
                        unitOfMeasure: unitOfMeasure,
                        packSize: packSize
                    }
                }
                , { headers: headers })
                .then(function (response) {
                    if (response?.data?.statusCode === 200) {
                        dispatch(addProduct(response?.data?.data));
                        clearFileds();
                    }

                })
                .catch(function (error) {
                    console.log("Product saving error-- " + error);
                });
        } else {
            setShowErrorMessage(true);
        }
    }

    const updateExistingProduct = async () => {
        if (productName !== '' && productDescription !== '' && productImgPath !== '' && sellingPrice > 0 && qty > 0 && unitOfMeasure !== '' && packSize > 0 && selectedCategoryId > 0) {
            const headers = {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
            await axios.put(UPDATE_PRODUCT,
                {
                    productId: editableProduct?.productId,
                    productName: productName,
                    productDescription: productDescription,
                    productImgPath: productImgPath,
                    categoryId: selectedCategoryId,
                    productStock: {
                        sellingPrice: sellingPrice,
                        qty: qty,
                        unitOfMeasure: unitOfMeasure,
                        packSize: packSize
                    }
                }
                , { headers: headers })
                .then(function (response) {
                    if (response?.data?.statusCode === 200) {
                        dispatch(updateProductsArray(response?.data?.data));
                        dispatch(clearEditableProduct());
                        clearFileds();
                    }

                })
                .catch(function (error) {
                    console.log("Product updating error-- " + error);
                });
        } else {
            setShowErrorMessage(true);
        }
    }

    useEffect(() => {
        if (isProductEditClicked) {
            loadEditableProductDetails();
        }
    }, [isProductEditClicked]);

    return (
        <div>
            <div className="p-4 border rounded-lg">
                <div className="">
                    <h2 className="text-base font-bold leading-7 text-gray-900">Add New Product</h2>

                    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3 flex flex-row">
                            <label htmlFor="product-name" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="product-name"
                                id="product-name"
                                autoComplete="given-name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-3 flex flex-row">
                            <label htmlFor="qty" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                                Qty
                            </label>
                            <input
                                type="number"
                                name="qty"
                                id="qty"
                                autoComplete="number"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-3 flex flex-row">
                            <label htmlFor="description" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                autoComplete="given-name"
                                multiple
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="sm:col-span-3 flex flex-row">
                            <label htmlFor="selling-price" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                                Selling Price
                            </label>
                            <input
                                type="text"
                                name="selling-price"
                                id="selling-price"
                                autoComplete="number"
                                value={sellingPrice}
                                onChange={(e) => setSellingPrice(e.target.value)}
                                className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="sm:col-span-3 flex flex-row">
                            <label htmlFor="img-url" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="img-url"
                                id="img-url"
                                autoComplete="text"
                                value={productImgPath}
                                onChange={(e) => setProductImgPath(e.target.value)}
                                className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-3 flex flex-row">
                            <label htmlFor="unit-of-measure" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                                Unit of Measure
                            </label>
                            <input
                                type="text"
                                name="unit-of-measure"
                                id="unit-of-measure"
                                autoComplete="text"
                                value={unitOfMeasure}
                                onChange={(e) => setUnitOfMeasure(e.target.value)}
                                className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="sm:col-span-3 flex flex-row">
                            <label htmlFor="category" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                value={selectedCategoryId}
                                onChange={(e) => setSelectedCategoryId(e.target.value)}
                                disabled={isProductEditClicked}
                            >
                                <option value={0} disabled>Select a Category</option>
                                {categories?.map((category) => <option key={category?.categoryId} value={category?.categoryId}>{category?.categoryName}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-3 flex flex-row">
                            <label htmlFor="pack-size" className="basis-1/4 block text-sm font-medium leading-6 text-gray-900">
                                Pack Size
                            </label>
                            <input
                                type="number"
                                name="pack-size"
                                id="pack-size"
                                value={packSize}
                                onChange={(e) => setPackSize(e.target.value)}
                                className="basis-3/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>


                {showErrorMessage ?
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <label htmlFor="" className=" text-xs font-thin leading-3 text-red-500">
                            Please enter missing details
                        </label>
                    </div>
                    : <></>}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={clearFileds}
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        className={classNames(
                            Object.keys(editableProduct).length > 0
                                ? 'bg-slate-200 hover:bg-slate-300 cursor-default'
                                : 'bg-[#d5e8d4] hover:bg-green-500 cursor-pointer',
                            'rounded-md  outline-[#aecfa0] px-3 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                        )}

                        onClick={saveNewProduct}
                        disabled={Object.keys(editableProduct).length > 0}
                    >
                        Save Product
                    </button>
                    <button
                        type="button"
                        className={classNames(
                            Object.keys(editableProduct).length < 0 || Object.keys(editableProduct).length === 0
                                ? 'bg-slate-200 hover:bg-slate-300 cursor-default'
                                : 'bg-[#ffe6cc] hover:bg-orange-500 cursor-pointer',
                            'rounded-md  outline-[#ffe6cc] px-3 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                        )}
                        onClick={updateExistingProduct}
                        disabled={Object.keys(editableProduct).length < 0}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div >
    );
}