import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const realEstateApi = createApi({
  reducerPath: "realEstateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getRealEstates: builder.query({
      query: () => "real-estate",
    }),
  }),
});

export const { useGetRealEstatesQuery } = realEstateApi;
