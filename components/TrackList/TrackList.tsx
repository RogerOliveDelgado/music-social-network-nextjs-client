import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import AlbumIcon from '@mui/icons-material/Album';
import { Track } from '../../interfaces/tracks';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { millisToMinutes } from '../../utils/converter';
/* A JWT token that is used to authenticate the user. */
import { useDispatch, useSelector } from 'react-redux';
import { updateTrackList } from '../../redux/features/player/musicPlayerSlice';
import {
  setCurrentIndex,
  setArtistName,
  currentTrack as setCurrentTrack,
} from '../../redux/features/player/currentTracks';
import { RootState } from '../../redux/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetPlaylistQuery } from '../../redux/playlistsAPI';

import toast, { Toaster } from 'react-hot-toast';

import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { Reorder, AnimatePresence, useDragControls } from 'framer-motion';

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';

import styles from './styles.module.css';
import { useGetPlaylistDetailsQuery } from '../../redux/playlistDetailsAPI';

type Props = {
  name: string;
  tracks: Track[];
  heightValue?: number;
  artist?: string;
  allowDelete?: boolean;
};

const TrackList = ({
  name,
  tracks,
  heightValue,
  artist,
  allowDelete,
}: Props) => {
  const [orderTracks, setOrderTracks] = useState<Track[]>(tracks);
  const [inPlayList, setInPlayList] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    'userID',
    'userToken',
  ]);

  const BASE_URL_SPOTIFY = process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND;
  const BASE_URL_USERS = process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND;

  const dragControls = useDragControls();
  const router = useRouter();

  const dispatch = useDispatch();
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  useEffect(() => {
    inPlayList && setOrderTracks(tracks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  const updatePlayer = (track: Track, index: number) => {
    if (inPlayList) {
      dispatch(updateTrackList(orderTracks));
      dispatch(setCurrentIndex(index));
      dispatch(setCurrentTrack(orderTracks[index]));
      dispatch(setArtistName(artist!));
    } else {
      dispatch(updateTrackList(tracks));
      dispatch(setCurrentIndex(index));
      dispatch(setCurrentTrack(tracks[index]));
      dispatch(setArtistName(artist!));
    }
  };

  const onReOrder = () => {
    dispatch(updateTrackList(orderTracks));
  };

  const addSong = (song: Track) => {
    const putSongInUser = async (song: Track) => {
      const response = await fetch(`${BASE_URL_SPOTIFY}/track/library`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `bearer ${cookies.userToken}`,
        },
        body: JSON.stringify(song),
      });
      const data = await response.json();

      //Get the user information to set again the likedSongs array with changes
      if (data.ok) {
        setTimeout(async () => {
          const userResponse = await fetch(
            `${BASE_URL_USERS}/user/${cookies.userID}`,
            {
              headers: {
                Authorization: `bearer ${cookies.userToken}`,
              },
            }
          );
          const user = await userResponse.json();
          refetch();
        }, 500);
      }
    };
    putSongInUser(song);
  };

  const addTrackToPlaylist = async (
    playlistId: string | string[] | undefined,
    track: Track
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL_SPOTIFY}/playlist/tracks/${playlistId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `bearer ${cookies.userToken}`,
          },
          body: JSON.stringify({
            tracks: track._id,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: playlists,
    isLoading: isLoadingPlaylist,
    error: playlistError,
    refetch,
  } = useGetPlaylistQuery(
    { userID: cookies.userID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { refetch: refetchPlaylistDetails } = useGetPlaylistDetailsQuery(
    { playlistID: router.query.playlistID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  const playlistId = router.query.playlistID;
  const userPlaylists = playlists?.data?.playlists;
  const likedSongs = playlists?.data?.likedSongs;

  //Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [trackTitle, setTrackTitle] = useState<Track>({} as Track);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    track: Track
  ) => {
    setAnchorEl(event.currentTarget);
    setTrackTitle(track);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const manageClick = (playlistID: string, track: Track) => {
    try {
      addTrackToPlaylist(playlistID, track);
      toast.success('Track added to playlist successfully');
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const deleteTrackFromPlaylist = async (track: Track) => {
    try {
      const response = await fetch(
        `${BASE_URL_SPOTIFY}/playlist/tracks/${playlistId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `bearer ${cookies.userToken}`,
          },
          body: JSON.stringify({
            tracks: track._id,
          }),
        }
      );
      if (response.ok) {
        refetchPlaylistDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isInPlaylistPath = router.pathname.includes('playlist');

  return (
    <div style={heightValue && { height: `${heightValue}rem` }}>
      <div className={styles.track_list_header}>
        <AlbumIcon />
        <p>{name || 'Album name'}</p>
      </div>
      {tracks ? (
        <div className={styles.tracks_list}>
          {(inPlayList ? orderTracks : tracks)?.map((track, index) => {
            //userLikedSongs
            return (
              <div key={index} className={styles.track_list_row}>
                <div className={styles.track_info}>
                  <p>
                    {track._id === currentTrack?._id ? (
                      <GraphicEqIcon />
                    ) : (
                      index + 1
                    )}
                  </p>
                  <p
                    className={styles.track_name}
                    onClick={() => updatePlayer(track, index)}
                  >
                    {track.title}
                  </p>
                </div>
                <div className={styles.buttons_container}>
                  {isInPlaylistPath ? (
                    <>
                      {allowDelete && (
                        <Tooltip title="Remove track from playlist">
                          <IconButton color="inherit" component="label">
                            <input hidden />
                            <RemoveCircleOutlineIcon
                              onClick={() => deleteTrackFromPlaylist(track)}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      {!allowDelete && (
                        <Tooltip title="Add track to playlist">
                          <IconButton color="inherit" component="label">
                            <input hidden />
                            <AddCircleOutlineIcon
                              onClick={() =>
                                addTrackToPlaylist(playlistId, track)
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  ) : (
                    <>
                      <Tooltip title="Add track to playlist">
                        <Button
                          color="inherit"
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={(e) => handleClick(e, track)}
                        >
                          <input hidden />
                          <AddCircleOutlineIcon />
                        </Button>
                      </Tooltip>
                    </>
                  )}
                  <IconButton color="inherit" component="label">
                    <input hidden />
                    {likedSongs?.some(
                      (element: Track) => element._id === track._id
                    ) ? (
                      <Tooltip title="Add to favorites">
                        <FavoriteIcon
                          onClick={() => {
                            addSong(track);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add to favorites">
                        <FavoriteBorderIcon
                          onClick={() => {
                            addSong(track);
                          }}
                        />
                      </Tooltip>
                    )}
                  </IconButton>
                  <p className={styles.track_duration}>
                    {millisToMinutes(track.duration)}
                  </p>
                  {inPlayList && (
                    <DragIndicatorIcon
                      className={styles.drag_icon}
                      onPointerDown={(e) => dragControls.start(e)}
                    />
                  )}
                </div>
              </div>
            );
          })}
          <Menu
            id="account-menu"
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{
              '& .MuiMenu-paper': {
                backgroundColor: 'var(--black)',
                color: 'white',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
              },
            }}
          >
            <h4
              className={styles.menu_title}
            >{`Select a playlist to add track '${trackTitle.title}':`}</h4>
            {userPlaylists?.map((playlist: any) => (
              <MenuItem
                key={playlist._id}
                onClick={() => manageClick(playlist._id, trackTitle)}
                sx={{
                  padding: '0.5rem 1rem',
                  '&:hover': {
                    backgroundColor: 'var(--grey)',
                  },
                }}
              >
                {playlist.title}
              </MenuItem>
            ))}
          </Menu>
          <Toaster />
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default TrackList;
