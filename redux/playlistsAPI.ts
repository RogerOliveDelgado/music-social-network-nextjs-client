import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userAPI =
  process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND || 'http://localhost:4001';

export const playlistsAPI = createApi({
  reducerPath: 'playlistsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: userAPI }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPlaylist: builder.query({
      query: ({ userID, token }) => ({
        url: `/user/${userID}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetPlaylistQuery } = playlistsAPI;

//https://github.com/reduxjs/redux-toolkit/issues/1028
//👆🏻duda como pasar varios valores a la query de rtk
