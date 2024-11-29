import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  users: null,
  error: null,
  loading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, setError, setLoading } = usersSlice.actions;

export default usersSlice.reducer;
