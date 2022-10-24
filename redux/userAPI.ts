import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../interfaces/ServerResponse";

const API = process.env.REACT_APP_API_URL || "http://localhost:4001";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUyNTQ1YzI4ZWUxOThhYjE0ZTc3NzIiLCJ1c2VybmFtZSI6Imp1bGlvNDQ0NiIsImlhdCI6MTY2NjYwNDIwNCwiZXhwIjoxNjY3MDM2MjA0fQ.H8dn76QqWYn9cLs_xC0TfAvW9IFHJHyYjlKZ5hWgKDA";

interface Response<T> {
  ok: boolean;
  data: T;
}

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getUser: builder.query<Response<User>, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        headers: { Authorization: `bearer ${TOKEN}` },
      }),
    }),
  }),
});

export const { useGetUserQuery } = userAPI;
