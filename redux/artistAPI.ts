import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
<<<<<<< HEAD
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4002";
=======
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND ||
  // 'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';
  "http://localhost:4002";
>>>>>>> 11d1a22e4732792e28d13b103847ba3104ca2947

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
