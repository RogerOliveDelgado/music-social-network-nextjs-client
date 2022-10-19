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
  setArtistName,
  currentTrack as setCurrentTrack,
} from '../../redux/features/player/currentTracks';
import { RootState } from '../../redux/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { Reorder, AnimatePresence, useDragControls } from 'framer-motion';

import styles from './styles.module.css';

type Props = {
  name: string;
  tracks: Track[];
  heightValue?: number;
  artist?: string;
};

const TrackList = ({ name, tracks, heightValue, artist }: Props) => {
  const [orderTracks, setOrderTracks] = useState<Track[]>(tracks);
  const [inPlayList, setInPlayList] = useState<boolean>(false);
  const dragControls = useDragControls();
  const router = useRouter();

  const dispatch = useDispatch();
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  useEffect(() => {
    if (router.pathname.includes('playlist')) {
      setInPlayList(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inPlayList && setOrderTracks(tracks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  useEffect(() => {
    inPlayList && onReOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderTracks]);

  const updatePlayer = (track: Track, index: number) => {
    if (inPlayList) {
      dispatch(updateTrackList(orderTracks));
      dispatch(setCurrentIndex(index));
      dispatch(setCurrentTrack(orderTracks[index]));
      dispatch(setArtistName(artist));
    } else {
      dispatch(updateTrackList(tracks));
      dispatch(setCurrentIndex(index));
      dispatch(setCurrentTrack(tracks[index]));
      dispatch(setArtistName(artist));
    }
  };

  const onReOrder = () => {
    dispatch(updateTrackList(orderTracks));
  };

  return (
    <div style={heightValue && { height: `${heightValue}rem` }}>
      <div className={styles.track_list_header}>
        <AlbumIcon />
        <p>{name || 'Album name'}</p>
      </div>
      {tracks ? (
        <Reorder.Group
          className={styles.tracks_list}
          axis="y"
          values={tracks}
          onReorder={setOrderTracks}
        >
          <AnimatePresence>
            {(inPlayList ? orderTracks : tracks)?.map((track, index) => {
              return (
                <Reorder.Item
                  value={track}
                  key={track._id}
                  className={styles.track_list_row}
                  dragControls={dragControls}
                >
                  <div className={styles.track_info}>
                    <p>
                      {track._id === currentTrack._id ? (
                        <GraphicEqIcon />
                      ) : (
                        index + 1
                      )}
                    </p>
                    <p
                      className={styles.track_name}
                      onClick={() => updatePlayer(track, index)}
                    >
                      {track.title}
                    </p>
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
                    {inPlayList && (
                      <DragIndicatorIcon
                        className={styles.drag_icon}
                        onPointerDown={(e) => dragControls.start(e)}
                      />
                    )}
                  </div>
                </Reorder.Item>
              );
            })}
          </AnimatePresence>
        </Reorder.Group>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default TrackList;
