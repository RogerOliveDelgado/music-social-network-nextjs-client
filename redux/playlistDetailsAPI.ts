import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const playlistAPI =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4002";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMzUwN2MwM2I3NWJiMDc1ZTVlYjIiLCJ1c2VybmFtZSI6InJvZ2VsaXRvQGdtYWlsLmNvbSIsImlhdCI6MTY2NjI2NjM3NSwiZXhwIjoxNjY2Njk4Mzc1fQ.WqDgwTHeY9803xmHBxkLCTt-DzYbQza4WdinKRRwVhc"



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
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});


export const { useGetPlaylistDetailsQuery } = playlistDetailsAPI;
