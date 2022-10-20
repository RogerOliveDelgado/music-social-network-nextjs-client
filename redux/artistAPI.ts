import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Artist } from '../interfaces/ServerResponse';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMzUwN2MwM2I3NWJiMDc1ZTVlYjIiLCJ1c2VybmFtZSI6InJvZ2VsaXRvQGdtYWlsLmNvbSIsImlhdCI6MTY2NjI2NjM3NSwiZXhwIjoxNjY2Njk4Mzc1fQ.WqDgwTHeY9803xmHBxkLCTt-DzYbQza4WdinKRRwVhc'

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
