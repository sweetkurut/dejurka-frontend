import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const furnitureApi = createApi({
  reducerPath: "furnitureApi",
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
    getTypeTypeFurniture: builder.query({
      query: () => "furniture",
    }),

    deleteTypeTypeFurniture: builder.mutation({
      query: (id) => ({
        url: `furniture/${id}`,
        method: "DELETE",
      }),
    }),

    getTypeTypeFurnitureDetail: builder.query({
      query: (id) => `furniture/${id}`,
    }),

    createTypeTypeFurniture : builder.mutation({
      query: (realEstateData) => ({
        url: "furniture",
        method: "POST",
        body: realEstateData,
      }),
    }),
  }),
});

export const { useGetTypeTypeFurnitureQuery} = furnitureApi;
