import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import AlbumIcon from '@mui/icons-material/Album';
import { Track } from '../../interfaces/artistResponse';
import { millisToMinutes } from '../../utils/converter';
import { useDispatch, useSelector } from 'react-redux';
import { updateTrackList } from '../../redux/features/player/musicPlayerSlice';
import {
  setCurrentIndex,
  currentTrack as setCurrentTrack,
} from '../../redux/features/player/currentTracks';
import { RootState } from '../../redux/store';

import GraphicEqIcon from '@mui/icons-material/GraphicEq';

import styles from './styles.module.css';

type Props = {
  name: string;
  tracks: Track[];
};

const TrackList = ({ name, tracks }: Props) => {
  const dispatch = useDispatch();
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  const updatePlayer = (track: Track, index: number) => {
    dispatch(updateTrackList(tracks));
    dispatch(setCurrentIndex(index));
    dispatch(setCurrentTrack(tracks[index]));
  };

  return (
    <div>
      <div className={styles.track_list_header}>
        <AlbumIcon />
        <p>{name || 'Album name'}</p>
      </div>
      <div className={styles.tracks_list}>
        {tracks?.map((track, index) => {
          return (
            <div
              key={track._id}
              className={styles.track_list_row}
              onClick={() => updatePlayer(track, index)}
            >
              <div className={styles.track_info}>
                <p>
                  {track._id === currentTrack._id ? (
                    <GraphicEqIcon />
                  ) : (
                    index + 1
                  )}
                </p>
                <p className={styles.track_name}>{track.title}</p>
              </div>
              <div className={styles.buttons_container}>
                <IconButton color="inherit" component="label">
                  <input hidden />
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton color="inherit" component="label">
                  <input hidden />
                  <FavoriteBorderIcon />
                </IconButton>
                <p className={styles.track_duration}>
                  {millisToMinutes(track.duration)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
