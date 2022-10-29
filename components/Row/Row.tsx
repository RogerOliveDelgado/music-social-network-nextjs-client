import AlbumCard from '../AlbumCard/AlbumCard';
import { Artist } from '../../interfaces/ServerResponse';
import { Album } from '../../interfaces/ServerResponse';
import { Playlist } from '../../interfaces/playlistResponse';
import { motion } from 'framer-motion';

import styles from './styles.module.css';

type Props = {};

const Row = ({ title, data, children }: any) => {
  return (
    <div className={styles.row_container}>
      <div className={styles.row_header}>
        <h2>{data !== undefined || data?.length !== 0 ? title : <></>}</h2>
      </div>
      <div className={styles.horizontal_scroll}>
        {!children &&
          data &&
          data
            .slice(0, 11)
            .map((item: Album | Artist | Playlist, index: number) => {
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.01 + index * 0.1 }}
                >
                  <AlbumCard key={item._id} item={item} />
                </motion.div>
              );
            })}
        {children}
      </div>
    </div>
  );
};

export default Row;
