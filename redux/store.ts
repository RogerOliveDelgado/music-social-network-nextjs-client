import { configureStore } from "@reduxjs/toolkit";
import { trackListSlice } from "./features/player/musicPlayerSlice";
import { currentTrackSlice } from "./features/player/currentTracks";

import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { albumAPI } from "./albumAPI";
import { artistAPI } from "./artistAPI";
import { playlistsAPI } from "./playlistsAPI";
import { playlistDetailsAPI } from "./playlistDetailsAPI";
import { trackAPI } from "./trackAPI";

export const store = configureStore({
  reducer: {
    tracks: trackListSlice.reducer,
    currentTrack: currentTrackSlice.reducer,
    [albumAPI.reducerPath]: albumAPI.reducer,
    [artistAPI.reducerPath]: artistAPI.reducer,
    [trackAPI.reducerPath]: trackAPI.reducer,
    [playlistDetailsAPI.reducerPath]: playlistDetailsAPI.reducer,
    [playlistsAPI.reducerPath]: playlistsAPI.reducer,
  },
  //Adding api middleware enables caching, invalidation, polling
  // and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      albumAPI.middleware,
      artistAPI.middleware,
      // playlistsAPI.middleware,
      // playlistDetailsAPI.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//optional, but required from refecthOnFocus/refecthOnReconnect behaviors
// see setupListeners docs for more info
setupListeners(store.dispatch);
