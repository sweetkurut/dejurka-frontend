import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  realEstate: null,
  error: null,
  loading: false,
};

export const realEstateSlice = createSlice({
  name: "realEstate",
  initialState,
  reducers: {
    setRealEstate: (state, action) => {
      state.realEstate = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setRealEstate, setError, setLoading } = realEstateSlice.actions;

export default realEstateSlice.reducer;
