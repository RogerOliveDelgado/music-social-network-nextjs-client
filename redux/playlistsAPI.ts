import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userAPI =
  process.env.USERS_BACKEND_URL || "http://localhost/users";


  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjY4NDk0MSwiZXhwIjoxNjY3MTE2OTQxfQ.pWj9iehT_syyoNjAzOpZ4oSN3opBC11UYG-0Ptreaqk";

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
