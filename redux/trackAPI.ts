import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || 'http://localhost/spotify';

export const trackAPI = createApi({
  reducerPath: 'trackAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getTracks: builder.query({
      query: () => '/track',
    }),
    getTracksDetails: builder.query({
      query: (trackID) => `/track/${trackID}`,
    }),
  }),
});

export const { useGetTracksQuery, useGetTracksDetailsQuery } = trackAPI;
