import React from 'react';

import AlbumCard from '../AlbumCard/AlbumCard';

import styles from './styles.module.css';
import 'swiper/css';
import 'swiper/css/pagination';

type Props = {};

const Row = ({ title }: any) => {
  return (
    <div className={styles.row_container}>
      <h2>{title}</h2>
      <div className={styles.horizontal_scroll}>
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
      </div>
    </div>
  );
};

export default Row;
