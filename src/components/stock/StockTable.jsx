
import axios from 'axios';
import { GET_ALL_PRODUCTS } from '../../utils/urls';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setDeletingProduct, setEditableProduct, setIsProductDeleted, setNewProductAdded, setProducts } from '../../reducers/ProductsSlice';

export default function StockTable() {

    const user = useSelector((state) => state.auth.user);
    const products = useSelector((state) => state?.products?.products);
    const newProductAdded = useSelector((state) => state?.products?.newProductAdded);
    const isProductDeleted = useSelector((state) => state?.products?.isProductDeleted);
    const dispatch = useDispatch();

    const loadActiveProducts = async () => {

        await axios.get(GET_ALL_PRODUCTS, { headers: { "Authorization": `Bearer ${user?.token}` } })
            .then(function (response) {
                if (response?.data?.statusCode === 200) {
                    dispatch(setProducts(response?.data?.data));
                }

            })
            .catch(function (error) {
                console.log("All products error-- " + error);
            });
    }
    useEffect(() => {
        loadActiveProducts();
    }, []);

    useEffect(() => {
        if (newProductAdded) {
            loadActiveProducts();
            dispatch(setNewProductAdded(false))
        }
    }, [newProductAdded]);

    useEffect(() => {
        if (isProductDeleted) {
            loadActiveProducts();
            dispatch(setIsProductDeleted(false))
        }
    }, [isProductDeleted]);

    return (
        <div className="mt-4 px-4 overflow-x-auto w-full">
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
                            UOM
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Category
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {products?.map((product) => (
                        <tr key={product?.productId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {product?.productId}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product?.productName}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product?.productStock?.qty}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product?.productStock?.sellingPrice}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product?.productStock?.unitOfMeasure}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product?.productDescription}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product?.categoryName}</td>

                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 ">
                                <button className="text-white hover:text-gray-300 bg-orange-300 hover:bg-orange-400 px-4 py-0.5 rounded-md"
                                    onClick={() => dispatch(setEditableProduct(product))}
                                >
                                    Edit<span className="sr-only">, {product?.productId}</span>
                                </button>
                                <button className="ml-4 text-white hover:text-gray-300 bg-red-300 hover:bg-red-400 px-4 py-0.5 rounded-md"
                                    onClick={() => dispatch(setDeletingProduct(product))}
                                >
                                    Delete<span className="sr-only">, {product?.productId}</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}