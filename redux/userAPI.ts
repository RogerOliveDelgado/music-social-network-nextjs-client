import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/ServerResponse';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4001';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkMzg5YjRkZTk5YzgyOTE5ZjAyYjciLCJ1c2VybmFtZSI6ImNhcmxvcyIsImlhdCI6MTY2NjI1NjQ2NSwiZXhwIjoxNjY2Njg4NDY1fQ.mEcTzjI1JAFro_f3OCP0qpI3TwSn_dhLVM1PpUK1CM8'

interface Response<T>{
  ok: boolean
  data: T
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getUser: builder.query<Response<User>, string>({
      query: (id) => ({
        url:`/user/${id}`,
        method: 'GET',
        headers: {Authorization: `bearer ${TOKEN}`}})
      })
  }),
});

export const { useGetUserQuery } = userAPI;
