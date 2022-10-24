import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/ServerResponse';
import { useCookies } from 'react-cookie';

const API =
  process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND || 'http://localhost:4001';

// const TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjYwODgzOSwiZXhwIjoxNjY3MDQwODM5fQ.vG3HadntCeYRofAR6ERiDFoM5gqeGRzKnzjGOcpQVak';

interface Response<T> {
  ok: boolean;
  data: T;
}
// const [cookies, setCookie, removeCookie] = useCookies(['username']);

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    //? refactorizar este tipado @roger tenia este <Response<User>, string>
    getUser: builder.query({
      query: ({ id, token }) => ({
        url: `/user/${id}`,
        method: 'GET',
        headers: { Authorization: `bearer ${token}` },
      }),
    }),
  }),
});

export const { useGetUserQuery } = userAPI;
