import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Artist } from '../interfaces/ServerResponse';

const API = process.env.REACT_APP_API_URL || 'http://localhost/spotify';

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjY4NDk0MSwiZXhwIjoxNjY3MTE2OTQxfQ.pWj9iehT_syyoNjAzOpZ4oSN3opBC11UYG-0Ptreaqk";
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
    }),
    getArtistData: builder.mutation<Response<Artist>, string>({
      query: (artistID) => `/artist/${artistID}`,
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useGetArtistDetailsQuery,
  useGetArtistDataMutation,
} = artistAPI;
