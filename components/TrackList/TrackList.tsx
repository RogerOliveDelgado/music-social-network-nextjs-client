import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import AlbumIcon from '@mui/icons-material/Album';
import styles from './styles.module.css';
type Props = {
  name: string;
};

const TrackList = (props: Props) => {
  const fakeList = [
    'Track 1',
    'Track 2',
    'Track 3',
    'Track 4',
    'Track 5',
    'Track 6',
    'Track 7',
    'Track 8',
    'Track 9',
    'Track 10',
  ];

  return (
    <div>
      <div className={styles.track_list_header}>
        <AlbumIcon />
        <p>{props.name || 'Album name'}</p>
      </div>
      <div className={styles.tracks_list}>
        {fakeList.map((track, index) => {
          return (
            <div key={index} className={styles.track_list_row}>
              <div className={styles.track_info}>
                <p>{index + 1}</p>
                <p className={styles.track_name}>{track}</p>
              </div>
              <div className={styles.buttons_container}>
                <IconButton color="inherit" component="label">
                  <input hidden />
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton color="inherit" component="label">
                  <input hidden />
                  <FavoriteBorderIcon />
                </IconButton>
                <p className={styles.track_duration}>12:67</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
