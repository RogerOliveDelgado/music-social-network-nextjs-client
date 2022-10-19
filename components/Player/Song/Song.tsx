import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import useWidth from '../../../hook/useWidth';

function Song() {
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );
  const { artistName } = useSelector((state: RootState) => state.currentTrack);

  const width = useWidth();

  useEffect(() => {
    const container = document.getElementById('container_song')?.offsetWidth;

    const titleSong = document.getElementById('title_song');
    const titleSongWidth = titleSong?.offsetWidth;

    const artistSong = document.getElementById('artist_song');
    const artistSongWidth = artistSong?.offsetWidth;

    if (
      container !== undefined &&
      titleSongWidth !== undefined &&
      titleSong !== null
    ) {
      if (titleSongWidth > container) {
        titleSong.classList.add(styles.rotate);
      } else {
        titleSong.classList.remove(styles.rotate);
      }
    }

    if (
      container !== undefined &&
      artistSongWidth !== undefined &&
      artistSong !== null
    ) {
      if (artistSongWidth > container) {
        artistSong.classList.add(styles.rotate);
      } else {
        artistSong.classList.remove(styles.rotate);
      }
    }
  }, [width, currentTrack]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.image_container}>
        <Image
          src="https://i.scdn.co/image/ab67616d00004851f4483d4440a89a2cab3b5141"
          alt="Picture of the author"
          width="52px"
          height="52px"
        />
      </div>
      <div id="container_song" className={styles.song_container}>
        <span id="title_song">{currentTrack?.title}</span>
        <span id="artist_song">{artistName}</span>
      </div>
      <div className={styles.icons}>
        <FavoriteIcon />
        <AddCircleIcon />
      </div>
    </div>
  );
}

export default Song;
