import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const accessTokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.token;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});
export const { setAccessToken, clearAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
