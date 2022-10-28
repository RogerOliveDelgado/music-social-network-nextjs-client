import { Button } from '@mui/material';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Tooltip from '@mui/material/Tooltip';
import FollowButton from '../../components/FollowButton/FollowButton';
import SkelettonButton from '../../components/SkelettonButton/SkelettonButton';
import { Album, Artist, User } from '../../interfaces/ServerResponse';
import { Track } from '../../interfaces/playlistResponse';
import { useGetUserQuery } from '../../redux/userAPI';
import { useCookies } from 'react-cookie';

import styles from './styles.module.css';
import { updateTrackList } from '../../redux/features/player/musicPlayerSlice';
import {
  setCurrentIndex,
  currentTrack as setCurrentTrack,
  setArtistName,
} from '../../redux/features/player/currentTracks';
import { useDispatch } from 'react-redux';

type Props = {
  album: Album;
  rating: number;
  tracks: Track[];
};

const AlbumHeader = ({ album, rating, tracks }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'userID',
    'userToken',
  ]);
  const dispatch = useDispatch();
  let isFollowed = undefined;

  let user = {
    _id: '',
    username: '',
    email: '',
    phone: '',
    image: '',
    playlists: [] as Track[],
    artists: [] as Artist[],
    albums: [] as Album[],
    likedSongs: [] as Track[],
    createdAt: '',
    updatedAt: '',
  };

  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserQuery({
    id: cookies.userID,
    token: cookies.userToken,
  });

  if (isSuccessUser) {
    user = dataUser.data;
    isFollowed = user.albums.some((albumX: Album) => albumX._id === album._id);
  }

  const playAlbumTracks = () => {
    dispatch(updateTrackList(tracks));
    dispatch(setCurrentIndex(0));
    dispatch(setCurrentTrack(tracks[0]));
    dispatch(setArtistName(album?.artist?.name!));
  };

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
        <h1 className={styles.album_name}>{album.title}</h1>
        <h2 className={styles.album_artist}>
          <InterpreterModeIcon />
          {album.artist.name}
        </h2>
        <Tooltip title="Add this album to your library.">
          {isSuccessUser ? (
            <FollowButton isFollowed={isFollowed} id={album._id} type="album" />
          ) : (
            <SkelettonButton />
          )}
        </Tooltip>
      </div>
      <div className={styles.play_button_container}>
        <Button
          onClick={playAlbumTracks}
          className={styles.play_button}
          variant="contained"
          color="inherit"
          startIcon={<PlayArrowIcon />}
        >
          Play
        </Button>
      </div>
    </>
  );
};

export default AlbumHeader;
