const API_HOST = "http://localhost:8080/pos/api";

module.exports = {
  USER_LOGIN: API_HOST + "/user/login",

  ADD_CATEGORY: API_HOST + "/category/save",
  GET_ALL_CATEGORIES: API_HOST + "/category/getAll",

  GET_ALL_PRODUCTS: API_HOST + "/product/getAll",
  ADD_PRODUCT: API_HOST + "/product/save",
  UPDATE_PRODUCT: API_HOST + "/product/update",
  DELETE_PRODUCT: API_HOST + "/product/delete/",
  SEARCH_PRODUCT_BY_ID: API_HOST + "/product/getById/",

  ADD_INVOICE: API_HOST + "/invoice/save",
};
