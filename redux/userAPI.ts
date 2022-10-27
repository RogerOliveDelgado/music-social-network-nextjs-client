import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/ServerResponse';
import { useCookies } from 'react-cookie';

const API =
  process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND || 'http://localhost/users';

interface Response<T> {
  ok: boolean;
  data: T;
}
// const [cookies, setCookie, removeCookie] = useCookies(['username']);

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
    getUser: builder.query<Response<User>, { id: string; token: string }>({
      query: ({ id, token }) => ({
        url: `/user/${id}`,
        method: 'GET',
        headers: { Authorization: `bearer ${token}` },
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
