import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.REACT_APP_API_URL ||
  'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';

export const artistAPI = createApi({
  reducerPath: 'artistAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => '/artist',
    }),
    getArtistDetails: builder.query({
      query: (artistID) => `/artist/${artistID}`,
    }),
  }),
});

export const { useGetArtistsQuery, useGetArtistDetailsQuery } = artistAPI;
