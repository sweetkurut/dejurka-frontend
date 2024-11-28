import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  sales: null,
  error: null,
  loading: false,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales: (state, action) => {
      state.sales = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSales, setError, setLoading } = salesSlice.actions;

export default salesSlice.reducer;
