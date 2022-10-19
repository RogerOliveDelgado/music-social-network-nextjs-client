import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API = process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND;
//  ||'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';

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
