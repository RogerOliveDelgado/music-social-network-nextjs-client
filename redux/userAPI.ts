import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/ServerResponse';

const API =
  // process.env.REACT_APP_API_URL ||
  'http://localhost/users';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRlNTMxOTBkZmNkYzVmNzIxZjIwZTYiLCJ1c2VybmFtZSI6InJvZ2VyIiwiaWF0IjoxNjY2NjIyMzM2LCJleHAiOjE2NjY2ODIzMzZ9.I_w4cptJu_hz3BdxSHBoZnsjp99zLDwuCglAi36XlBE';

interface Response<T> {
  ok: boolean;
  data: T;
}

interface CloudinaryQuery {
  id: string
  username: string
  phone: string
  image: string
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
      query: ({username, phone, image, id}) => ({
        url: `/user/${id}`,
        method: 'PUT',
        headers: {Authorization: `bearer ${TOKEN}`},
        body: {
          username:username,
          phone: phone,
          image: image
        }
      })
    })
  }),
});

export const { useGetUserQuery, useEditUserMutation } = userAPI;
