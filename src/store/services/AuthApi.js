import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authUser: builder.mutation({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body, 
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setError("Ошибка аутентификации"));
          dispatch(setLoading(false));
        }
      },
    }),
    
  }),
});

export const { useAuthUserMutation, useGetUserDataQuery } = authApi;
