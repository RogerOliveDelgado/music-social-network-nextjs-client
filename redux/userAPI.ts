import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../interfaces/ServerResponse";

const API = process.env.REACT_APP_API_URL || "http://localhost:4001";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUyYmRkZGY2NTM3OGQxOTgzM2RjODciLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjM2Njk0MSwiZXhwIjoxNjY2Nzk4OTQxfQ.2KBuSla7WzmE8ou6BFIQLQ0U-mZnf7oh4i2XzE0za_c";

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
