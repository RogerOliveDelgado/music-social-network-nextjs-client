import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/ServerResponse';

const API =
  // process.env.REACT_APP_API_URL ||
  'http://localhost/users';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUyNTQ1YzI4ZWUxOThhYjE0ZTc3NzIiLCJ1c2VybmFtZSI6Imp1bGlvNjIiLCJpYXQiOjE2NjY2ODcxNzcsImV4cCI6MTY2NzExOTE3N30.WFNaCh_FBxOvNBY0E9Jo2XuUxUj00ubYeQIs7Cm6dJA';

interface Response<T> {
  ok: boolean;
  data: T;
}

interface CloudinaryQuery {
  id: string;
  username: string;
  phone: string;
  image: string;
  token: string;
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
    editUser: builder.mutation<Response<User>, CloudinaryQuery>({
      query: ({ username, phone, image, id, token }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        headers: { Authorization: `bearer ${token}` },
        body: {
          username: username,
          phone: phone,
          image: image,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useEditUserMutation } = userAPI;
