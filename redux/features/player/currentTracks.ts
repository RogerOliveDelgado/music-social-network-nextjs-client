import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Track } from '../../../interfaces/artistResponse';

interface CurrentTrack {
  currentTrack: Track;
  index: number;
  artistName: string;
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
  index: 0,
  artistName: '',
} as CurrentTrack;

export const currentTrackSlice = createSlice({
  name: 'currentTrack',
  initialState,
  reducers: {
    currentTrack: (state: CurrentTrack, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    incrementIndex: (state: CurrentTrack) => {
      state.index += 1;
    },
    decrementIndex: (state: CurrentTrack) => {
      state.index -= 1;
    },
    resetIndex: (state: CurrentTrack) => {
      state.index = initialState.index;
    },
    setCurrentIndex: (state: CurrentTrack, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setArtistName: (state: CurrentTrack, action: PayloadAction<string>) => {
      state.artistName = action.payload;
    },
  },
});

export const {
  currentTrack,
  incrementIndex,
  decrementIndex,
  resetIndex,
  setCurrentIndex,
  setArtistName,
} = currentTrackSlice.actions;

export const selectCurrentTrack = (state: RootState) => state.currentTrack;

export default currentTrackSlice.reducer;
