import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useRouter } from 'next/router';
import QRModal from '../QRModal/QRModal';
import { useState } from 'react';

import styles from './styles.module.css';

type Props = {};

const AlbumCard = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  const [qrUrl, setQRUrl] = useState('');
  const { _id, title, image, name, popularity, isPublic } = item;

  const router = useRouter();

  const handleClose = () => setOpen(false);
  const handleNavigation = () => {
    if (name) {
      router.push(`/artist/${_id}`);
    } else if (image.includes('cloudinary')) {
      router.push(`/playlist/${_id}`);
    } else {
      router.push(`/album/${_id}`);
    }
  };

  const handleQR = () => {
    if (name) {
      setQRUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}/artist/${_id}`);
    } else if (image.includes('cloudinary')) {
      setQRUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}/playlist/${_id}`);
    } else {
      setQRUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}/album/${_id}`);
    }
    setOpen(true);
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.card}>
        <QRModal state={open} onClose={handleClose} url={qrUrl} />
        <div
          className={`${styles.card_image} ${name && styles.card_image_artist}`}
          onClick={handleNavigation}
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
            <QrCode2Icon onClick={handleQR} />
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
