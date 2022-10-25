import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userAPI =
  process.env.USERS_BACKEND_URL || "http://localhost/users";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRlNTMxOTBkZmNkYzVmNzIxZjIwZTYiLCJ1c2VybmFtZSI6InJvZ2VyIiwiaWF0IjoxNjY2NjIyMzM2LCJleHAiOjE2NjY2ODIzMzZ9.I_w4cptJu_hz3BdxSHBoZnsjp99zLDwuCglAi36XlBE";

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
