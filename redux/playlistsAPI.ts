import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userAPI =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4001";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkMzg5YjRkZTk5YzgyOTE5ZjAyYjciLCJ1c2VybmFtZSI6ImNhcmxvcyIsImlhdCI6MTY2NjI1NjQ2NSwiZXhwIjoxNjY2Njg4NDY1fQ.mEcTzjI1JAFro_f3OCP0qpI3TwSn_dhLVM1PpUK1CM8";

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
