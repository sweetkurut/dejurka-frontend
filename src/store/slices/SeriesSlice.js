import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  series: null,
  error: null,
  loading: false,
};

export const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSeries, setError, setLoading } = seriesSlice.actions;

export default seriesSlice.reducer;
