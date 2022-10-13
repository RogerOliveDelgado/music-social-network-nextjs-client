import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Track } from '../../../interfaces/artistResponse';

interface CurrentTrack {
  currentTrack: Track;
}

const initialState = {
  currentTrack: {
    _id: '',
    title: '',
    duration: 0,
    trackNumber: 1,
    trackAudio: '',
    album: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  },
} as CurrentTrack;

export const currentTrackSlice = createSlice({
  name: 'currentTrack',
  initialState,
  reducers: {
    currentTrack: (state: CurrentTrack, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { currentTrack } = currentTrackSlice.actions;

export const selectCurrentTrack = (state: RootState) => state.currentTrack;

export default currentTrackSlice.reducer;
