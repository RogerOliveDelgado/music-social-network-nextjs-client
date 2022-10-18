import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND ||
  //   'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';
  "http://localhost:4002";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRhZjMxNDQ1MmUwZmQxNDk0M2E5OTUiLCJ1c2VybmFtZSI6InZpY3RvcjIyIiwiaWF0IjoxNjY1ODU2MzEzLCJleHAiOjE2NjYyODgzMTN9.GCiZBqp1wuWDUEhpIZVM5lhtfL6sgKxAKKJ-E11izow";

export const playlistAPI = createApi({
  reducerPath: "playlistAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
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
