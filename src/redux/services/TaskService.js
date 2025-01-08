import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//utils
import getAuthToken from "../../utils/getAuthToken";

export const TaskApi = createApi({
  reducerPath: "TaskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/task`,
    prepareHeaders: async (headers, { getState }) => {
      const token = await getAuthToken();
      headers.set("Authorization", token);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    statusChange: builder.mutation({
      query: () => ({
        url: `/getTask`,
        method: "GET",
      }),
    }),
    startTaskaction: builder.mutation({
      query: (value) => ({
        url: `/startTask`,
        method: "POST",
        body: value,
      }),
    }),
    stopTaskaction: builder.mutation({
      query: (value) => ({
        url: `/stopTask`,
        method: "POST",
        body: value,
      }),
    }),
  }),
});

export const {
  useStatusChangeMutation,
  useStartTaskactionMutation,
  useStopTaskactionMutation,
} = TaskApi;
