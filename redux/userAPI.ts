import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4001';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUwMGM1OWIxMWYxN2Y3YWUwNGE4OWMiLCJ1c2VybmFtZSI6InJvZ2VsaXRvIiwiaWF0IjoxNjY2MTkwNDI1LCJleHAiOjE2NjY2MjI0MjV9.HywxZ6WF907ygn1Ss_cXiPKLtAIC_sFAF5d8bCYYMHE'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  keepUnusedDataFor: 0,
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
