import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND ||
  //   'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';
  "http://localhost:4002";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkMzg5YjRkZTk5YzgyOTE5ZjAyYjciLCJ1c2VybmFtZSI6ImNhcmxvcyIsImlhdCI6MTY2NjAxNTY2NywiZXhwIjoxNjY2NDQ3NjY3fQ.Ab1oBxGAQVaQIX5jnHxYWsETMUNn_Mp1OyA7gFCvN0M";

export const playlistAPI = createApi({
  reducerPath: "playlistAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPlaylist: builder.query({
      query: () => ({
        url: "/playlist",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getPlaylistDetails: builder.query({
      query: (playlistID) => ({
        url: `/playlist/${playlistID}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetPlaylistQuery, useGetPlaylistDetailsQuery } = playlistAPI;
