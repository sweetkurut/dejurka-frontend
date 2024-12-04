import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  furniture: null,
  error: null,
  loading: false,
};

export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    setFurniture: (state, action) => {
      state.furniture = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setFurniture, setError, setLoading } = furnitureSlice.actions;

export default furnitureSlice.reducer;
