import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND ||
  //   'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';
  'http://localhost:4002';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMzUwN2MwM2I3NWJiMDc1ZTVlYjIiLCJ1c2VybmFtZSI6InJvZ2VsaXRvQGdtYWlsLmNvbSIsImlhdCI6MTY2NjI2NjM3NSwiZXhwIjoxNjY2Njk4Mzc1fQ.WqDgwTHeY9803xmHBxkLCTt-DzYbQza4WdinKRRwVhc';

export const searchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (searchQuery) => ({
        url: `/search/${searchQuery}`,
        method: 'GET',
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
    }),
  }),
});

export const { useGetSearchQuery } = searchAPI;
