import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userAPI =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4001";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMzUwN2MwM2I3NWJiMDc1ZTVlYjIiLCJ1c2VybmFtZSI6InJvZ2VsaXRvQGdtYWlsLmNvbSIsImlhdCI6MTY2NjI2NjM3NSwiZXhwIjoxNjY2Njk4Mzc1fQ.WqDgwTHeY9803xmHBxkLCTt-DzYbQza4WdinKRRwVhc";

export const playlistsAPI = createApi({
  reducerPath: "playlistsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: userAPI }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPlaylist: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetPlaylistQuery } = playlistsAPI;
