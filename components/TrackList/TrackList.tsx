import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import AlbumIcon from '@mui/icons-material/Album';
import { Track } from '../../interfaces/artistResponse';
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

import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { Reorder, AnimatePresence, useDragControls } from 'framer-motion';

import styles from './styles.module.css';

type Props = {
  name: string;
  tracks: Track[];
  heightValue?: number;
  artist?: string;
};

const TrackList = ({ name, tracks, heightValue, artist }: Props) => {
  
  const [orderTracks, setOrderTracks] = useState<Track[]>(tracks);
  const [inPlayList, setInPlayList] = useState<boolean>(false);
  //data user hardcoded, these data has being modified with the id and token information, to get it we have to take it from cookies(JULIO)
  const id = '634d389b4de99c82919f02b7';
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkMzg5YjRkZTk5YzgyOTE5ZjAyYjciLCJ1c2VybmFtZSI6ImNhcmxvcyIsImlhdCI6MTY2NjI1NjQ2NSwiZXhwIjoxNjY2Njg4NDY1fQ.mEcTzjI1JAFro_f3OCP0qpI3TwSn_dhLVM1PpUK1CM8'
  const [userLikedSongs, setUserLikedSongs] = useState<Track[]>([]);

  const dragControls = useDragControls();
  const router = useRouter();

  const dispatch = useDispatch();
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  useEffect(() => {
    if (router.pathname.includes('favorites')) {//playList
      setInPlayList(true);
    }

    //Get the users likedSongs array
    //Save the founed array in the likedSongs state   
    const getUser = async() => {
      const response = await fetch(`http://localhost:4001/user/${id}`,{
        headers:{
          Authorization: `bearer ${TOKEN}`
        }
      })
      const user = await response.json();
      let array: string[] = [];
      user.data?.likedSongs.map((song: any) => {
        array.push(song);
      })
      setUserLikedSongs(array); 
      setOrderTracks(array)  
    }
    getUser(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inPlayList && setOrderTracks(tracks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  useEffect(() => {
    inPlayList && onReOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderTracks]);

  const updatePlayer = (track: Track, index: number) => {
    if (inPlayList) {
      dispatch(updateTrackList(orderTracks));
      dispatch(setCurrentIndex(index));
      dispatch(setCurrentTrack(orderTracks[index]));
      dispatch(setArtistName(artist));
    } else {
      dispatch(updateTrackList(tracks));
      dispatch(setCurrentIndex(index));
      dispatch(setCurrentTrack(tracks[index]));
      dispatch(setArtistName(artist));
    }
  };

  const onReOrder = () => {
    dispatch(updateTrackList(orderTracks));
  };

  const addSong = (song:Track) => {
    const putSongInUser = async(song:Track) => {
      const response = await fetch(`http://localhost:4002/track/library`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json; charset=utf-8',
          Authorization:`bearer ${TOKEN}`,
        },
        body: JSON.stringify(song)
      })
      const data = await response.json();
      
      //Get the user information to set again the likedSongs array with changes
      if(data.ok){
        setTimeout(async()=>{
          const userResponse = await fetch(`http://localhost:4001/user/${id}`,{
            headers:{
              Authorization: `bearer ${TOKEN}`
            }
          })
          const user = await userResponse.json();

          let arrayFavouritesSongs: Track[] = [];
          user.data.likedSongs.map((song:any) => {
            arrayFavouritesSongs.push(song)
          })
          setOrderTracks(arrayFavouritesSongs)
          setUserLikedSongs(arrayFavouritesSongs);
        },500)        
      }
    }
    putSongInUser(song)
  }
  return (
    <div style={heightValue && { height: `${heightValue}rem` }}>
      <div className={styles.track_list_header}>
        <AlbumIcon />
        <p>{name || 'Album name'}</p>
      </div>
      {tracks ? (
        <Reorder.Group
          className={styles.tracks_list}
          axis="y"
          values={tracks}
          onReorder={setOrderTracks}
        >
          <AnimatePresence>
            {(inPlayList ? orderTracks : tracks)?.map((track, index) => {//userLikedSongs
              return (
                <Reorder.Item
                  value={track}
                  key={track._id}
                  className={styles.track_list_row}
                  dragControls={dragControls}
                >
                  <div className={styles.track_info}>
                    <p>
                      {track._id === currentTrack._id ? (
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
                    <IconButton color="inherit" component="label">
                      <input hidden />
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton color="inherit" component="label">
                      <input hidden />
                      {userLikedSongs?.some(element => element._id === track._id) ? <FavoriteIcon onClick={() => {addSong(track)}}/> : <FavoriteBorderIcon onClick={() => {addSong(track)}}/>}
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
                </Reorder.Item>
              );
            })}
          </AnimatePresence>
        </Reorder.Group>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default TrackList;