import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND ||
  //   'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';
  "http://localhost:4002";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMDdjZDY2YWM4M2RiNWIwMDNlNWQiLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjI1NDc5NywiZXhwIjoxNjY2Njg2Nzk3fQ.hjYAmvSLm1yXNJpmCK3bFwOvj9OfQpmvOvEwleFSpzg";

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
