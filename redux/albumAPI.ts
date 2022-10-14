import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ5MTRhZWFlNDg3ODA3NzBiZmMyZDUiLCJ1c2VybmFtZSI6Imp1YW5reW55IiwiaWF0IjoxNjY1NzMzODA2LCJleHAiOjE2NjYxNjU4MDZ9.D4v24lNJYygDejRfcjWVrYZsi6zhWXTXLWUy7UMuYDo'

export const albumAPI = createApi({
  reducerPath: 'albumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: () => '/album',
    }),
    getAlbumDetails: builder.query({
      query: (albumID: string) => `/album/${albumID}`,
    }),
    addAlbumToLibrary: builder.mutation({
      query: (album) => ({
        url: `/album/library`,
        method: 'PUT',
        headers: {Authorization: `bearer ${TOKEN}`},
        body: album
      })
    })
  }),
});

export const { useGetAlbumsQuery, useGetAlbumDetailsQuery, useAddAlbumToLibraryMutation } = albumAPI;
