import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userRole: null,
    user: null,
    token: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.userRole = action.payload.userRole;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userRole = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
