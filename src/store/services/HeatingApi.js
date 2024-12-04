import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heatingApi = createApi({
  reducerPath: "heatingApi",
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
    getTypeHeatings: builder.query({
      query: () => "heating",
    }),

    deleteTypeHeating: builder.mutation({
      query: (id) => ({
        url: `heating/${id}`,
        method: "DELETE",
      }),
    }),

    getTypeHeatingDetail: builder.query({
      query: (id) => `heating/${id}`,
    }),

    createTypeHeating : builder.mutation({
      query: (realEstateData) => ({
        url: "heating",
        method: "POST",
        body: realEstateData,
      }),
    }),
  }),
});

export const { useGetTypeHeatingsQuery} = heatingApi;
