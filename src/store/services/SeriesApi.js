import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const seriesApi = createApi({
  reducerPath: "seriesApi",
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
    getSeries: builder.query({
      query: () => "series",
    }),

    deleteSeries: builder.mutation({
      query: (id) => ({
        url: `series/${id}`,
        method: "DELETE",
      }),
    }),

    getSeriesDetail: builder.query({
      query: (id) => `series/${id}`,
    }),


    createSeries: builder.mutation({
      query: (data) => {
        // Лог для проверки данных перед запросом
        console.log("Отправка данных для продажи:", data);
        return {
          url: "series",
          method: "POST",
          body: data,
        };
      },
    })

  }),
});

export const { useCreateSeriesMutation, useGetSeriesDetailQuery, useDeleteSeriesMutation, useGetSeriesQuery } = seriesApi;
