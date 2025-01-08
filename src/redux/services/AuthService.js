import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),

  endpoints: (builder) => ({
    // login user service
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    signin: builder.mutation({
      query: ({ email, password }) => ({
        url: `/signup`,
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useSigninMutation } = AuthApi;
