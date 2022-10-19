import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4002";

export const albumAPI = createApi({
  reducerPath: "albumAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: () => "/album",
    }),
    getAlbumDetails: builder.query({
      query: (albumID) => `/album/${albumID}`,
    }),
  }),
});

export const { useGetAlbumsQuery, useGetAlbumDetailsQuery } = albumAPI;
