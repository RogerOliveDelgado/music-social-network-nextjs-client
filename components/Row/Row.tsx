import AlbumCard from '../AlbumCard/AlbumCard';
import { Artist } from '../../interfaces/ServerResponse';
import { Album } from '../../interfaces/ServerResponse';
import { Playlist } from '../../interfaces/playlistResponse';
import { motion } from 'framer-motion';

import styles from './styles.module.css';
import { useI18N } from '../../context/i18';

type Props = {
  title: string;
  data: Album[] | Artist[] | Playlist[];
  children?: React.ReactNode;
  explore: Function;
};

const Row = ({ title, data, children, explore }: any) => {
  const { t } = useI18N();
  return (
    <div className={styles.row_container}>
      <div className={styles.row_header}>
        <h2>{data !== undefined || data?.length !== 0 ? title : <></>}</h2>
        <p className={styles.explore_button}>
          {data !== undefined || data?.length !== 0 ? (
            <button
              className={styles.explore_button}
              onClick={() => explore(title)}
            >
              <p>{t('tooltip').explore}</p>
              <svg
                stroke-width="4"
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </button>
          ) : (
            <></>
          )}
        </p>
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
