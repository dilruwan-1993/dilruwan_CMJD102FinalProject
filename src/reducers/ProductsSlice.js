import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    newProductAdded: false,
    isProductDeleted: false,
    isProductEditClicked: false,
    isPrDeletionConfirmed: false,
    editableProduct: {},
    deletingProduct: {},
    isProductAddedSuccess: false,
    isProductUpdatedSuccess: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.newProductAdded = true;
      state.isProductAddedSuccess = true;
    },
    setNewProductAdded: (state, action) => {
      state.newProductAdded = action.payload;
    },
    setIsProductEditClicked: (state, action) => {
      state.isProductEditClicked = action.payload;
    },
    setEditableProduct: (state, action) => {
      state.editableProduct = action.payload;
      state.isProductEditClicked = true;
    },
    clearEditableProduct: (state) => {
      state.editableProduct = {};
      state.isProductEditClicked = false;
    },
    updateProductsArray: (state, action) => {
      let updatedProduct = action.payload;
      let existingIndex = state.products.findIndex(
        (product) => product.productId == updatedProduct.productId
      );
      if (existingIndex !== -1) {
        state.products[existingIndex] = updatedProduct;
      }
      state.isProductUpdatedSuccess = true;
    },
    setIsPrDeletionConfirmed: (state, action) => {
      state.isPrDeletionConfirmed = action.payload;
    },
    setDeletingProduct: (state, action) => {
      state.deletingProduct = action.payload;
      state.isPrDeletionConfirmed = true;
    },
    removingDeletingProduct: (state) => {
      state.isPrDeletionConfirmed = false;
      state.deletingProduct = {};
    },
    setIsProductDeleted: (state, action) => {
      state.isProductDeleted = action.payload;
    },
    setIsProductAddedSuccess: (state, action) => {
      state.isProductAddedSuccess = action.payload;
    },
    setIsProductUpdatedSuccess: (state, action) => {
      state.isProductUpdatedSuccess = action.payload;
    },
  },
});
export const {
  setProducts,
  addProduct,
  setNewProductAdded,
  setEditableProduct,
  setIsProductEditClicked,
  clearEditableProduct,
  updateProductsArray,
  setIsPrDeletionConfirmed,
  setDeletingProduct,
  removingDeletingProduct,
  setIsProductDeleted,
  setIsProductAddedSuccess,
  setIsProductUpdatedSuccess,
} = productsSlice.actions;
export default productsSlice.reducer;
