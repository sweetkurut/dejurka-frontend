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
  }),
});

export const { useGetRealEstatesQuery } = realEstateApi;
