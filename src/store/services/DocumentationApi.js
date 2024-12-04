import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const documentationApi = createApi({
  reducerPath: "documentationApi",
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
    getTypeDocumentation: builder.query({
      query: () => "documentation",
    }),

    deleteTypeDocumentation: builder.mutation({
      query: (id) => ({
        url: `documentation/${id}`,
        method: "DELETE",
      }),
    }),

    getTypeDocumentationDetail: builder.query({
      query: (id) => `documentation/${id}`,
    }),

    createTypeDocumentation : builder.mutation({
      query: (realEstateData) => ({
        url: "documentation",
        method: "POST",
        body: realEstateData,
      }),
    }),
  }),
});

export const { useGetTypeDocumentationQuery} = documentationApi;
