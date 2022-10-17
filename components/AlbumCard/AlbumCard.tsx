import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

type Props = {};

const AlbumCard = ({ item }: any) => {
  const { _id, title, image, name } = item;

  const router = useRouter();

  const handleNavigation = () => {
    if (name) {
      router.push(`/artist/${_id}`);
    } else {
      router.push(`/album/${_id}`);
    }
  };

  return (
    <div className={styles.card_container} onClick={handleNavigation}>
      <div className={styles.card}>
        <div
          className={`${styles.card_image} ${name && styles.card_image_artist}`}
        >
          <Image
            className={styles.image}
            src={image}
            height={24}
            width={24}
            layout="responsive"
            alt="Album cover"
          />
        </div>
        {/* <IconButton
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
        </IconButton> */}
        <div className={styles.card_content}>
          <div className={styles.card_info}>
            <p className={styles.album_name}>{name ? name : title}</p>
            {/* <p
              className={styles.album_artist}
              onClick={() => router.push(`/artist/${1}`)}
            >
              Album Artist
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
