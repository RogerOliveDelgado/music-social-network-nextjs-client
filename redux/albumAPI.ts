import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Track, Album, Artist } from "../interfaces/ServerResponse";

const API =
  process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "http://localhost:4002";

type Item = Artist | Album | Track;

interface LibraryQuery {
  name: string;
  id: string;
  token: string;
}

interface Response<T> {
  ok: boolean;
  data: T;
}

export const albumAPI = createApi({
  reducerPath: "albumAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getAlbums: builder.query<Response<Album[]>, any>({
      query: () => "/album",
    }),
    getAlbumDetails: builder.query<Response<Album>, string>({
      query: (albumID) => `/album/${albumID}`,
    }),
    addItemToLibrary: builder.mutation<Response<Item>, LibraryQuery>({
      query: ({ name, id, token }) => ({
        url: `/${name}/library`,
        method: "PUT",
        headers: { Authorization: `bearer ${token}` },
        body: { _id: id },
      }),
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useGetAlbumDetailsQuery,
  useAddItemToLibraryMutation,
} = albumAPI;
