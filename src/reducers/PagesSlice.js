import { createSlice } from "@reduxjs/toolkit";

export const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    pageDisplayName: "",
    navigation: [
      {
        name: "POS",
        href: "/pos",
        active: false,
        displayName: "Point of Sales",
      },
      {
        name: "Stock Management",
        href: "/stocks",
        active: true,
        displayName: "Stock Management",
      },
    ],
  },
  reducers: {
    setPageDisplayName: (state, action) => {
      state.pageDisplayName = action.payload;
    },
    setNavigation: (state, action) => {
      state.navigation = action.payload;
    },
    setActivePage: (state, action) => {
      const { pageName } = action.payload;
      state.navigation.forEach((item) => {
        item.active = item.name === pageName;
      });
      console.log(state.navigation);
    },
  },
});

export const { setPageDisplayName, setNavigation, setActivePage } =
  pagesSlice.actions;
export default pagesSlice.reducer;
