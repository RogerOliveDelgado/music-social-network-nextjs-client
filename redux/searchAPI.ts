import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND ||
  //   'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';
  "http://localhost:4002";

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUyYmRkZGY2NTM3OGQxOTgzM2RjODciLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjM2Njk0MSwiZXhwIjoxNjY2Nzk4OTQxfQ.2KBuSla7WzmE8ou6BFIQLQ0U-mZnf7oh4i2XzE0za_c";

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
