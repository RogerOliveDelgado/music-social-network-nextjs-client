import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userAPI =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4001";


  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUyNTQ1YzI4ZWUxOThhYjE0ZTc3NzIiLCJ1c2VybmFtZSI6Imp1bGlvNDQ0NiIsImlhdCI6MTY2NjYwNDIwNCwiZXhwIjoxNjY3MDM2MjA0fQ.H8dn76QqWYn9cLs_xC0TfAvW9IFHJHyYjlKZ5hWgKDA";

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
