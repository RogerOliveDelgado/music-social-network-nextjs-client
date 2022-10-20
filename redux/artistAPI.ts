import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Artist } from '../interfaces/ServerResponse';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkMzg5YjRkZTk5YzgyOTE5ZjAyYjciLCJ1c2VybmFtZSI6ImNhcmxvcyIsImlhdCI6MTY2NjI1NjQ2NSwiZXhwIjoxNjY2Njg4NDY1fQ.mEcTzjI1JAFro_f3OCP0qpI3TwSn_dhLVM1PpUK1CM8'

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
