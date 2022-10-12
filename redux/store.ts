import { configureStore } from '@reduxjs/toolkit';
import { trackListSlice } from './features/player/musicPlayerSlice';

import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { albumAPI } from './albumAPI';

export const store = configureStore({
  reducer: {
    tracks: trackListSlice.reducer,
    [albumAPI.reducerPath]: albumAPI.reducer,
  },
  //Adding api middleware enables caching, invalidation, polling
  // and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(albumAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//optional, but required from refecthOnFocus/refecthOnReconnect behaviors
// see setupListeners docs for more info
setupListeners(store.dispatch);
