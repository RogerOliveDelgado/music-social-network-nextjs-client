import { configureStore } from '@reduxjs/toolkit';
import { trackListSlice } from './features/player/musicPlayerSlice';

export const store = configureStore({
  reducer: {
    tracks: trackListSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
