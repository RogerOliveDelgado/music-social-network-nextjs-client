import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || 'http://localhost:4002';

export const searchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: ({ searchQuery, token }) => ({
        url: `/search/${searchQuery}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetSearchQuery } = searchAPI;
