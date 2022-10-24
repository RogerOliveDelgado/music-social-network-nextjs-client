import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../interfaces/ServerResponse";

const API = process.env.REACT_APP_API_URL || "http://localhost:4001";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjYwODgzOSwiZXhwIjoxNjY3MDQwODM5fQ.vG3HadntCeYRofAR6ERiDFoM5gqeGRzKnzjGOcpQVak";

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
