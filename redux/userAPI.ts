import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4001';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ5NjY1M2IzMmJiYmU2NTIxYmVjMjkiLCJ1c2VybmFtZSI6IlJvZ2VyIiwiaWF0IjoxNjY1NzU0NzA3LCJleHAiOjE2NjYxODY3MDd9.72ZanxJI8Z6QAvrIsFVibK-hIS-cfu-BRLi1t2i1jhE'

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
