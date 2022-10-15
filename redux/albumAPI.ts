import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Track, Album, Artist } from '../interfaces/ServerResponse';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ5NjY1M2IzMmJiYmU2NTIxYmVjMjkiLCJ1c2VybmFtZSI6IlJvZ2VyIiwiaWF0IjoxNjY1NzU0NzA3LCJleHAiOjE2NjYxODY3MDd9.72ZanxJI8Z6QAvrIsFVibK-hIS-cfu-BRLi1t2i1jhE'

type Item = Artist | Album | Track

interface LibraryQuery {
  name: string,
  id: string
}

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
    addItemToLibrary: builder.mutation<Item, LibraryQuery>({
      query: ({name, id}) => ({
        url: `/${name}/library`,
        method: 'PUT',
        headers: {Authorization: `bearer ${TOKEN}`},
        body: {_id: id}
      })
    })
  }),
});

export const { useGetAlbumsQuery, useGetAlbumDetailsQuery, useAddItemToLibraryMutation } = albumAPI;
