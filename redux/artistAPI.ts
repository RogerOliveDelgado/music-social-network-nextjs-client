import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ4MzIxNzRjZjA5NzkxMzM1OGFhZGIiLCJ1c2VybmFtZSI6Imp1YW5reW55IiwiaWF0IjoxNjY1Njc1Nzk5LCJleHAiOjE2NjYxMDc3OTl9.djX5rgF1Z-srhjJ3XbgpI2ZrmzXf9CKsODiR8OkuDfU'

export const artistAPI = createApi({
  reducerPath: 'artistAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => '/artist',
    }),
    getArtistDetails: builder.query({
      query: (artistID) => `/artist/${artistID}`,
    })
  }),
});

export const { useGetArtistsQuery, useGetArtistDetailsQuery } = artistAPI;
