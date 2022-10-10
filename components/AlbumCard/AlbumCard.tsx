import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.css';

type Props = {};

const AlbumCard = (props: Props) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card}>
        <div className={styles.card_image}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/e/e3/BombayBicycleClub.jpg"
            height={170}
            width={200}
            objectFit="cover"
            alt="Album cover"
          />
        </div>
        <IconButton
          className={styles.play_button}
          aria-label="delete"
          size="small"
        >
          <PlayArrowIcon
            sx={{
              background: 'var(--darker_blue)',
              borderRadius: '50%',
              color: 'white',
              fontSize: '3rem',
            }}
          />
        </IconButton>
        <div className={styles.card_content}>
          <div className={styles.card_info}>
            <p className={styles.album_name}>Album Name Name Name Name</p>
            <p className={styles.album_artist}>Album Artist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
