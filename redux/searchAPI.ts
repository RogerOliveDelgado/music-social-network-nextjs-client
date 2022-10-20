import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND ||
  //   'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';
  "http://localhost:4002";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkMzg5YjRkZTk5YzgyOTE5ZjAyYjciLCJ1c2VybmFtZSI6ImNhcmxvcyIsImlhdCI6MTY2NjI1NjQ2NSwiZXhwIjoxNjY2Njg4NDY1fQ.mEcTzjI1JAFro_f3OCP0qpI3TwSn_dhLVM1PpUK1CM8";

export const searchAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (searchQuery) => ({
        url: `/search/${searchQuery}`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
    }),
  }),
});

export const { useGetSearchQuery } = searchAPI;
