import AddNewCategory from "../components/stock/AddNewCategory";
import AddNewProduct from "../components/stock/AddNewProduct";
import StockTable from "../components/stock/StockTable";
import TopNav from "../components/TopNav";
import { setCategories, setNewCategoryAdded } from "../reducers/CategorySlice";
import { GET_ALL_CATEGORIES } from "../utils/urls";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from "react";
import DeleteConfirmation from "../components/stock/DeleteConfirmation";
import NewCategoryAddedSucces from "../components/stock/NewCategoryAddedSucces";
import NewProductSavedSucces from "../components/stock/NewProductSavedSucces";
import UpdateProductSuccess from "../components/stock/UpdateProductSuccess";

export default function StocksManagement() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const newCategoryAdded = useSelector((state) => state.categories.newCategoryAdded);

    const loadActiveCategories = async () => {

        await axios.get(GET_ALL_CATEGORIES, { headers: { "Authorization": `Bearer ${user?.token}` } })
            .then(function (response) {
                if (response?.data?.statusCode === 200) {
                    dispatch(setCategories(response?.data?.data));
                }

            })
            .catch(function (error) {
                console.log("All categories error-- " + error);
            });
    }


    useEffect(() => {
        loadActiveCategories();
    }, []);

    useEffect(() => {
        if (newCategoryAdded) {
            loadActiveCategories();
            dispatch(setNewCategoryAdded(false));
        }
    }, [newCategoryAdded]);

    return (
        <>

            <TopNav />
            <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-x-4 p-4">
                <div className="lg:col-span-3">
                    <AddNewProduct />
                </div>
                <div className="lg:col-span-1">
                    <AddNewCategory />
                </div>
            </div>
            <StockTable />
            <DeleteConfirmation />
            <NewProductSavedSucces />
            <UpdateProductSuccess />
            <NewCategoryAddedSucces />
        </>
    )
}