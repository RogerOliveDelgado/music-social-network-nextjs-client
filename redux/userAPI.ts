import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/ServerResponse';

const API =
  // process.env.REACT_APP_API_URL ||
  'http://localhost/users/';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUxMTMwODRjMzM5MTY2Mzg2NjIyYWYiLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjI3NjYxMywiZXhwIjoxNjY2NzA4NjEzfQ.B9_2nkGwWER7bO7eDI4d4rkEgemZ6zAdJOpLnKFQKKk';

interface Response<T> {
  ok: boolean;
  data: T;
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getUser: builder.query<Response<User>, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${TOKEN}` },
      }),
    }),
  }),
});

export const { useGetUserQuery } = userAPI;
