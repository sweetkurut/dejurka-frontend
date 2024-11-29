import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
  
    getUsers: builder.query({
      query: () => "users",
    }),

    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),

    getUsersDetail: builder.query({
      query: (id) => `users/${id}`,
    }),


    createUser: builder.mutation({
      query: (data) => {
        // Лог для проверки данных перед запросом
        console.log("Отправка данных для продажи:", data);
        return {
          url: "users",
          method: "POST",
          body: data,
        };
      },
    })

  }),
});

export const { useCreateUserMutation, useGetUsersDetailQuery, useGetUsersQuery, useDeleteUsersMutation } = userApi;
