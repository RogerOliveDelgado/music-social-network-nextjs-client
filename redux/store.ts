import { configureStore } from '@reduxjs/toolkit';
import { trackListSlice } from './features/player/musicPlayerSlice';
import { currentTrackSlice } from './features/player/currentTracks';

import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { albumAPI } from './albumAPI';
import { artistAPI } from './artistAPI';
import { playlistAPI } from './playlistAPI';
import { trackAPI } from './trackAPI';

import { searchAPI } from './searchAPI';

export const store = configureStore({
  reducer: {
    tracks: trackListSlice.reducer,
    currentTrack: currentTrackSlice.reducer,
    [albumAPI.reducerPath]: albumAPI.reducer,
    [artistAPI.reducerPath]: artistAPI.reducer,
    [playlistAPI.reducerPath]: playlistAPI.reducer,
    [trackAPI.reducerPath]: trackAPI.reducer,
    [searchAPI.reducerPath]: searchAPI.reducer,
  },
  //Adding api middleware enables caching, invalidation, polling
  // and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      albumAPI.middleware,
      artistAPI.middleware,
      playlistAPI.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//optional, but required from refecthOnFocus/refecthOnReconnect behaviors
// see setupListeners docs for more info
setupListeners(store.dispatch);
