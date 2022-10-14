import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4001';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ5MTRhZWFlNDg3ODA3NzBiZmMyZDUiLCJ1c2VybmFtZSI6Imp1YW5reW55IiwiaWF0IjoxNjY1NzMzODA2LCJleHAiOjE2NjYxNjU4MDZ9.D4v24lNJYygDejRfcjWVrYZsi6zhWXTXLWUy7UMuYDo'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url:`/user/${id}`,
        method: 'GET',
        headers: {Authorization: `bearer ${TOKEN}`}})
      })
  }),
});

export const { useGetUserQuery } = userAPI;
