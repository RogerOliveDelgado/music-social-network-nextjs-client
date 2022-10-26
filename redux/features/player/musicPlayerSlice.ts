import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Track } from '../../../interfaces/playlistResponse';
import { Album } from '../../../interfaces/ServerResponse';

export interface NewTrack {
  _id: string;
  title: string;
  duration: number;
  trackNumber: number;
  trackAudio: string;
  album: Album;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface TracksList {
  tracks: Array<Track | NewTrack>;
}

const initialState = {
  tracks: [
    {
      _id: '',
      title: '',
      duration: 0,
      trackNumber: 1,
      trackAudio: '',
      album: {},
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
    updateTrackList: (
      state: TracksList,
      action: PayloadAction<Track[] | NewTrack[]>
    ) => {
      state.tracks = action.payload;
    },
    updateSingleSong: (state: TracksList, action: PayloadAction<NewTrack>) => {
      state.tracks[0] = action.payload;
    },
  },
});

export const { updateTrackList, updateSingleSong } = trackListSlice.actions;

export const selectTrackList = (state: RootState) => state.tracks;

export default trackListSlice.reducer;
