import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Artist } from '../interfaces/ServerResponse';

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || 'http://localhost:4002';

c;
interface Response<T> {
  ok: boolean;
  data: T;
}

export const artistAPI = createApi({
  reducerPath: 'artistAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getArtists: builder.query<Response<Artist[]>, unknown>({
      query: () => '/artist',
    }),
    getArtistData: builder.mutation<Response<Artist>, string>({
      query: (artistID) => `/artist/${artistID}`,
    }),
    getArtistDetails: builder.query<
      Response<Artist>,
      { artistID: string; token: string }
    >({
      query: ({ artistID, token }) => `/artist/${artistID}`,
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useGetArtistDetailsQuery,
  useGetArtistDataMutation,
} = artistAPI;
