import React from 'react';

import AlbumCard from '../AlbumCard/AlbumCard';
import { Artist } from '../../interfaces/artistResponse';
import { Album } from '../../interfaces/ServerResponse';

import styles from './styles.module.css';

type Props = {};

const Row = ({ title, data, children }: any) => {
  return (
    <div className={styles.row_container}>
      <h2>{title}</h2>
      <div className={styles.horizontal_scroll}>
        {!children &&
          data.slice(0, 11).map((item: Album | Artist) => {
            return <AlbumCard key={item._id} item={item} />;
          })}
        {children}
      </div>
    </div>
  );
};

export default Row;
