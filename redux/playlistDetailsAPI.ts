import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const playlistAPI =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || 'http://localhost:4002';

export const playlistDetailsAPI = createApi({
  reducerPath: 'playlistDetailsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: playlistAPI }),
  keepUnusedDataFor: .5,
  endpoints: (builder) => ({
    getPlaylistDetails: builder.query({
      query: ({ playlistID, token }) => ({
        url: `/playlist/${playlistID}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetPlaylistDetailsQuery } = playlistDetailsAPI;
