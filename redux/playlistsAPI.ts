import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userAPI =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4001";


  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjYwODgzOSwiZXhwIjoxNjY3MDQwODM5fQ.vG3HadntCeYRofAR6ERiDFoM5gqeGRzKnzjGOcpQVak";

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
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
    }),
  }),
});

export const { useGetPlaylistQuery } = playlistsAPI;
