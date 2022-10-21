import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Artist } from '../interfaces/ServerResponse';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMTMwODRjMzM5MTY2Mzg2NjIyYWYiLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjI3NjYxMywiZXhwIjoxNjY2NzA4NjEzfQ.B9_2nkGwWER7bO7eDI4d4rkEgemZ6zAdJOpLnKFQKKk'

interface Response<T>{
  ok: boolean
  data: T
}

export const artistAPI = createApi({
  reducerPath: 'artistAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getArtists: builder.query<Response<Artist[]>, unknown>({
      query: () => '/artist',
    }),
    getArtistDetails: builder.query<Response<Artist>, string>({
      query: (artistID) => `/artist/${artistID}`,
    })
  }),
});

export const { useGetArtistsQuery, useGetArtistDetailsQuery } = artistAPI;
