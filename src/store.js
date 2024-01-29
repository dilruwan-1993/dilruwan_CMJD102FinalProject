import { configureStore } from "@reduxjs/toolkit";
import pagesSlice from "./reducers/PagesSlice";
import authSlice from "./reducers/AuthSlice";
import categorySlice from "./reducers/CategorySlice";
import productsSlice from "./reducers/ProductsSlice";
import posSlice from "./reducers/PosSlice";

export default configureStore({
  reducer: {
    pages: pagesSlice,
    auth: authSlice,
    categories: categorySlice,
    products: productsSlice,
    pos: posSlice,
  },
});
