import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  repairs: null,
  error: null,
  loading: false,
};

export const repairSlice = createSlice({
  name: "repairs",
  initialState,
  reducers: {
    setRepairs: (state, action) => {
      state.repairs = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setRepairs, setError, setLoading } = repairSlice.actions;

export default repairSlice.reducer;
