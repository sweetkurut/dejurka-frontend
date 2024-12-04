import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  documentation: null,
  error: null,
  loading: false,
};

export const documentationSlice = createSlice({
  name: "documentation",
  initialState,
  reducers: {
    setDocument: (state, action) => {
      state.documentation = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setDocument, setError, setLoading } = documentationSlice.actions;

export default documentationSlice.reducer;
