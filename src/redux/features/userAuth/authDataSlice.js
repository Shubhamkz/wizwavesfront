// src/redux/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
};

const authDataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.authData = action.payload;
    },
    clearAuthData(state) {
      state.authData = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authDataSlice.actions;

export default authDataSlice.reducer;
