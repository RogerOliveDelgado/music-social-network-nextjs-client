import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

export interface TracksList {
  tracks: Array<Track>;
}

const initialState = {
  tracks: [
    {
      id: 0,
      title: '',
      artist: '',
      src: '',
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
