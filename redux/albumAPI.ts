import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Track, Album, Artist } from '../interfaces/ServerResponse';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUwMGM1OWIxMWYxN2Y3YWUwNGE4OWMiLCJ1c2VybmFtZSI6InJvZ2VsaXRvIiwiaWF0IjoxNjY2MTkwNDI1LCJleHAiOjE2NjY2MjI0MjV9.HywxZ6WF907ygn1Ss_cXiPKLtAIC_sFAF5d8bCYYMHE'

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
