import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const repairApi = createApi({
  reducerPath: "repairApi",
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
    getTypeRepairs: builder.query({
      query: () => "repair",
    }),

    deleteTypeRepair: builder.mutation({
      query: (id) => ({
        url: `repair/${id}`,
        method: "DELETE",
      }),
    }),

    getTypeRepairDetail: builder.query({
      query: (id) => `repair/${id}`,
    }),

    createTypeRepair : builder.mutation({
      query: (realEstateData) => ({
        url: "repair",
        method: "POST",
        body: realEstateData,
      }),
    }),
  }),
});

export const { useGetTypeRepairsQuery} = repairApi;
