import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../interfaces/ServerResponse";

const API =
  // process.env.REACT_APP_API_URL ||
  'http://localhost/users';

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjY4NDk0MSwiZXhwIjoxNjY3MTE2OTQxfQ.pWj9iehT_syyoNjAzOpZ4oSN3opBC11UYG-0Ptreaqk";

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
  reducerPath: "userAPI",
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
