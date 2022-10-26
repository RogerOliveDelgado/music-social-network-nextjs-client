import Image from 'next/image';
import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import styles from './styles.module.css';
import { useGetArtistDataMutation } from '../../redux/artistAPI';

import { Track } from '../../interfaces/tracks';
import {
  NewTrack,
  updateSingleSong,
} from '../../redux/features/player/musicPlayerSlice';
import { useDispatch } from 'react-redux';

import {
  currentTrack as setCurrentTrack,
  setArtistName,
} from '../../redux/features/player/currentTracks';

type Props = {
  tracks: Track[];
};

const FreeSongs = ({ tracks }: Props) => {
  const dispatch = useDispatch();
  const [getArtistData] = useGetArtistDataMutation();

  const handlePlay = async (track: NewTrack) => {
    console.log(track.album.artist);
    dispatch(updateSingleSong(track));
    dispatch(setCurrentTrack(track));
    const response = await getArtistData(
      track.album.artist as unknown as string
    );

    dispatch(setArtistName(response.data.data.name!));
  };

  return (
    <div className={styles.carousel__songs}>
      {tracks.map((track) => (
        <div key={track._id} className={styles.songDiv}>
          <div className={styles.imgSongDiv}>
            <Image
              src={track.album.image}
              alt={track.title}
              width={125}
              height={125}
            />
          </div>
          <span className={styles.songName}>{track.title}</span>

          <button
            className={styles.playButton}
            onClick={() => handlePlay(track as unknown as NewTrack)}
          >
            <PlayCircleIcon sx={{ fontSize: '2rem' }} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FreeSongs;
