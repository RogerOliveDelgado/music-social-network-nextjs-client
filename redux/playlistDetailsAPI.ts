import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const playlistAPI =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4002";

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUyYmRkZGY2NTM3OGQxOTgzM2RjODciLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjM2Njk0MSwiZXhwIjoxNjY2Nzk4OTQxfQ.2KBuSla7WzmE8ou6BFIQLQ0U-mZnf7oh4i2XzE0za_c";



export const playlistDetailsAPI = createApi({
  reducerPath: "playlistDetailsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: playlistAPI }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPlaylistDetails: builder.query({
      query: (playlistID) => ({
        url: `/playlist/${playlistID}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
    }),
  }),
});


export const { useGetPlaylistDetailsQuery } = playlistDetailsAPI;
