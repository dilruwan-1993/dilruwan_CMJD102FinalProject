import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    newCategoryAdded: false,
    isCategoryAddedSuccess: false,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    setNewCategoryAdded: (state, action) => {
      state.newCategoryAdded = action.payload;
    },
    setIsCategoryAddedSuccess: (state, action) => {
      state.isCategoryAddedSuccess = action.payload;
    },
  },
});
export const {
  setCategories,
  addCategory,
  setNewCategoryAdded,
  setIsCategoryAddedSuccess,
} = categorySlice.actions;
export default categorySlice.reducer;
