import styles from './styles.module.css';
import { Album } from '../../interfaces/ServerResponse';
import { Artist } from '../../interfaces/ServerResponse';
import { Playlist } from '../../interfaces/playlistResponse';
import AlbumCard from '../AlbumCard/AlbumCard';
import { motion } from 'framer-motion';

import { useI18N } from '../../context/i18';

type Props = {
  data?: Album[] | Artist[] | Playlist[];
  noData?: string;
  title?: string;
};

const GridLayout = ({ data, noData, title }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      {data ? (
        <div className={styles.grid_container}>
          {data?.map((item, index) => {
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.01 + index * 0.1 }}
              >
                <AlbumCard item={item} />
              </motion.div>
            );
          })}
        </div>
      ) : (
        <h3>{noData}</h3>
      )}
    </>
  );
};

export default GridLayout;
