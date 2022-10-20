import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND ||
  //   'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';
  "http://localhost:4002";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMTMwODRjMzM5MTY2Mzg2NjIyYWYiLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjI3NjYxMywiZXhwIjoxNjY2NzA4NjEzfQ.B9_2nkGwWER7bO7eDI4d4rkEgemZ6zAdJOpLnKFQKKk";

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
