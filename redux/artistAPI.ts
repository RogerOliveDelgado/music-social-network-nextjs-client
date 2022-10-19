import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4002";

export const artistAPI = createApi({
  reducerPath: "artistAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => "/artist",
    }),
    getArtistDetails: builder.query({
      query: (artistID) => `/artist/${artistID}`,
    }),
  }),
});

export const { useGetArtistsQuery, useGetArtistDetailsQuery } = artistAPI;
