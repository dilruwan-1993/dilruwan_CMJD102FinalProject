import { createSlice } from "@reduxjs/toolkit";

export const posSlice = createSlice({
  name: "pos",
  initialState: {
    invoiceItemList: [],
    isItemsListUpdated: false,
    invoiceSubTotal: 0,
    payment: 0,
    showInvoiceConfirmation: false,
  },
  reducers: {
    setInvoiceItemList: (state, action) => {
      state.invoiceItemList = action.payload;
    },
    addInvoiceItem: (state, action) => {
      let item = action.payload;
      let existingIndex = state.invoiceItemList.findIndex(
        (i) => i.productStockId === item.productStockId
      );

      if (existingIndex !== -1) {
        let existingItem = state.invoiceItemList[existingIndex];
        let newItemQty = Number(existingItem.itemQty) + Number(item.itemQty);
        let newSubTotal = existingItem.itemPrice * newItemQty;
        let oldSubTotal = existingItem.subTotal;
        existingItem.itemQty = newItemQty;
        existingItem.subTotal = newSubTotal;
        state.invoiceItemList[existingIndex] = existingItem;
        state.invoiceSubTotal =
          state.invoiceSubTotal - oldSubTotal + newSubTotal;
      } else {
        state.invoiceSubTotal = state.invoiceSubTotal + item.subTotal;
        state.invoiceItemList.push(action.payload);
      }
    },

    removeItemFromList: (state, action) => {
      let deletingItem = action.payload;
      state.invoiceSubTotal = state.invoiceSubTotal - deletingItem.subTotal;
      let updatedList = state.invoiceItemList.filter(
        (item) => item.productStockId !== deletingItem.productStockId
      );

      state.invoiceItemList = updatedList;
      state.isItemsListUpdated = true;
    },
    setIsItemsListUpdated: (state, action) => {
      state.isItemsListUpdated = action.payload;
    },

    setInvoiceSubTotal: (state, action) => {
      state.invoiceSubTotal = action.payload;
    },

    setTotalPayment: (state, action) => {
      state.payment = action.payload;
      state.showInvoiceConfirmation = true;
    },
    setShowInvoiceConfirmation: (state, action) => {
      state.showInvoiceConfirmation = action.payload;
    },
    clearPosSlice: (state) => {
      state.invoiceItemList = [];
      state.isItemsListUpdated = false;
      state.invoiceSubTotal = 0;
      state.payment = 0;
      state.showInvoiceConfirmation = false;
    },
  },
});
export const {
  setInvoiceItemList,
  addInvoiceItem,
  removeItemFromList,
  setIsItemsListUpdated,
  setInvoiceSubTotal,
  setTotalPayment,
  setShowInvoiceConfirmation,
  clearPosSlice,
} = posSlice.actions;
export default posSlice.reducer;
