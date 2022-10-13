import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Track } from '../../../interfaces/artistResponse';

export interface TracksList {
  tracks: Array<Track>;
}

const initialState = {
  tracks: [
    {
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
  ],
} as TracksList;

export const trackListSlice = createSlice({
  name: 'trackList',
  initialState,
  reducers: {
    updateTrackList: (state: TracksList, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
    },
  },
});

export const { updateTrackList } = trackListSlice.actions;

export const selectTrackList = (state: RootState) => state.tracks;

export default trackListSlice.reducer;
