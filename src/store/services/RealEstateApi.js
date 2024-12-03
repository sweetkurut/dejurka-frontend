import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const realEstateApi = createApi({
  reducerPath: "realEstateApi",
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
    getRealEstates: builder.query({
      query: () => "real-estate",
    }),

    deleteRealEstate: builder.mutation({
      query: (id) => ({
        url: `real-estate/${id}`,
        method: "DELETE",
      }),
    }),

    getRealEstateDetail: builder.query({
      query: (id) => `real-estate/${id}`,
    }),

    createRealEstata : builder.mutation({
      query: (realEstateData) => ({
        url: "real-estate",
        method: "POST",
        body: realEstateData,
      }),
    }),
  }),
});

export const { useGetRealEstatesQuery, useDeleteRealEstateMutation, useGetRealEstateDetailQuery, useCreateRealEstataMutation } = realEstateApi;
