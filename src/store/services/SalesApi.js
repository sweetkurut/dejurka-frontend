import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      console.log("Token from localStorage:", token); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); 
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => "sales",
    }),

    deleteSales: builder.mutation({
      query: (id) => ({
        url: `sales/${id}`,
        method: "DELETE",
      }),
    }),

    getSalesDetail: builder.query({
      query: (id) => `sales/${id}`,
    }),
  }),
});

export const { useGetSalesQuery, useDeleteSalesMutation, useGetSalesDetailQuery } = salesApi;
