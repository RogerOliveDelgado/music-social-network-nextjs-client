import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.REACT_APP_API_URL ||
  'http://ec2-44-211-78-241.compute-1.amazonaws.com:4000/';

export const albumAPI = createApi({
  reducerPath: 'albumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: () => '/album',
    }),
    getAlbumDetails: builder.query({
      query: (albumID) => `/album/${albumID}`,
    }),
  }),
});

export const { useGetAlbumsQuery, useGetAlbumDetailsQuery } = albumAPI;
