import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Track, Album, Artist } from '../interfaces/ServerResponse';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMTMwODRjMzM5MTY2Mzg2NjIyYWYiLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjI3NjYxMywiZXhwIjoxNjY2NzA4NjEzfQ.B9_2nkGwWER7bO7eDI4d4rkEgemZ6zAdJOpLnKFQKKk'

type Item = Artist | Album | Track

interface LibraryQuery {
  name: string,
  id: string
}

interface Response<T>{
  ok: boolean
  data: T
}

export const albumAPI = createApi({
  reducerPath: 'albumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getAlbums: builder.query<Response<Album[]>, any>({
      query: () => '/album',
    }),
    getAlbumDetails: builder.query<Response<Album>, string>({
      query: (albumID) => `/album/${albumID}`,
    }),
    addItemToLibrary: builder.mutation<Response<Item>, LibraryQuery>({
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
