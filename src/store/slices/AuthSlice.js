import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  auth: null,
  error: null,
  setLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, setError, setLoading } = authSlice.actions;

export default authSlice.reducer;
