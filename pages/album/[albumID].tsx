import Image from 'next/image';
import Rating from '@mui/material/Rating';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Tooltip from '@mui/material/Tooltip';

import Layout from '../../components/Layout/Layout';
import TrackList from '../../components/TrackList/TrackList';
import styles from './styles.module.css';

type Props = {};

const AlbumDetails = (props: Props) => {
  return (
    <Layout>
      <div className={styles.album_details_container}>
        <div className={styles.album_details}>
          <Image
            className={styles.album_image}
            src="https://upload.wikimedia.org/wikipedia/en/8/8a/BombayBicycleClubSongalbumcover.jpg"
            alt={'bombay'}
            width={200}
            height={200}
            layout="fixed"
          />
          <div className={styles.album_details_text}>
            <p className={styles.albums_ratings}>
              Album <Rating name="simple-controlled" value={4} />
            </p>
            <h1 className={styles.album_name}>So Long, See You Tomorrow</h1>
            <h2 className={styles.album_artist}>
              <InterpreterModeIcon />
              Bombay Bicycle Club
            </h2>
            <Tooltip title="Add this album to your library.">
              <Button
                className={styles.follow_button}
                variant="contained"
                color="inherit"
                startIcon={<FavoriteBorderIcon />}
              >
                Follow
              </Button>
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
        </div>
        <div className={styles.album_tracks_info}>
          <div className={styles.album_extra_info}>
            <p className={styles.extra_info_title}>Details</p>
            <span className={styles.info_element}>
              <p className={styles.info_element_title}>Release Date:</p>
              <p>2014-09-08</p>
            </span>
            <span className={styles.info_element}>
              <p className={styles.info_element_title}>Duration:</p>{' '}
              <p>65:65</p>
            </span>
          </div>
          <div className={styles.album_tracklist}>
            <h2>Tracklist</h2>
            <TrackList name="TrackList" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlbumDetails;
