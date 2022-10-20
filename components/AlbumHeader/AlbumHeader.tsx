import { Button } from '@mui/material';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Tooltip from '@mui/material/Tooltip';
import FollowButton from '../../components/FollowButton/FollowButton';
import SkelettonButton from '../../components/SkelettonButton/SkelettonButton';
import { Album } from '../../interfaces/ServerResponse';
import { useGetUserQuery } from '../../redux/userAPI';

import styles from './styles.module.css'

type Props = {
    album: Album
    artist: Artist
    rating: number
}

const AlbumHeader = ({album, rating}:Props) => {

      if (isSuccessUser) {
        isFollowed = user.albums.some((album: Album) => album._id === albumID)
      }

    return (
        <>
            <Image
              className={styles.album_image}
              src={album.image}
              alt={album.title}
              width={200}
              height={200}
              layout="fixed"
            />
            <div className={styles.album_details_text}>
              <p className={styles.albums_ratings}>
                Album <Rating name="simple-controlled" value={rating} />
              </p>
              <h1 className={styles.album_name}>{dataAlbum?.data.title}</h1>
              <h2 className={styles.album_artist}>
                <InterpreterModeIcon />
                {dataArtist?.data.name}
              </h2>
              <Tooltip title="Add this album to your library.">
                {isSuccessUser && albumID ? <FollowButton isFollowed={isFollowed} id={albumID} type='album'/> :
                <SkelettonButton/>}
              </Tooltip>
            </div>
            <div className={styles.play_button_container}>
              <Button
                className={styles.play_button}
                variant="contained"
                color="inherit"
                startIcon={<PlayArrowIcon />}
              >
                Play
              </Button>
        </div>
        </>
    )
}

export default AlbumHeader 
