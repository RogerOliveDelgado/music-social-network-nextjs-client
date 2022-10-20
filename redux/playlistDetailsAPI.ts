import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const playlistAPI =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4002";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkMzg5YjRkZTk5YzgyOTE5ZjAyYjciLCJ1c2VybmFtZSI6ImNhcmxvcyIsImlhdCI6MTY2NjI1NjQ2NSwiZXhwIjoxNjY2Njg4NDY1fQ.mEcTzjI1JAFro_f3OCP0qpI3TwSn_dhLVM1PpUK1CM8"



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
