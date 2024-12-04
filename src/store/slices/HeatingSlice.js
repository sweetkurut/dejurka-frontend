import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  heatings: null,
  error: null,
  loading: false,
};

export const heatingSlice = createSlice({
  name: "heatings",
  initialState,
  reducers: {
    setHeating: (state, action) => {
      state.heatings = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setHeating, setError, setLoading } = heatingSlice.actions;

export default heatingSlice.reducer;
