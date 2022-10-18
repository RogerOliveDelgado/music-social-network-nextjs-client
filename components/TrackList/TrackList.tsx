import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import AlbumIcon from '@mui/icons-material/Album';
import { Track } from '../../interfaces/artistResponse';
import { millisToMinutes } from '../../utils/converter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type Props = {
  name: string;
  tracks: Track[];
};

const TrackList = ({ name, tracks }: Props) => {
  const id = '634d389b4de99c82919f02b7';
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkMzg5YjRkZTk5YzgyOTE5ZjAyYjciLCJ1c2VybmFtZSI6ImNhcmxvcyIsImlhdCI6MTY2NjAxNTY2NywiZXhwIjoxNjY2NDQ3NjY3fQ.Ab1oBxGAQVaQIX5jnHxYWsETMUNn_Mp1OyA7gFCvN0M'
  const [userLikedSongs, setUserLikedSongs] = useState<string[]>([]);

  console.log(tracks);
  useEffect(()=>{
    // if(isReady){
      //tenemos las tracks del artista
      //Obtenemos el array likedSongs del usuario loggeado
      //Almacenamos en un array(estado) las Tracks que se encuentran   
      const getUser = async() => {
        const response = await fetch(`http://localhost:4001/user/${id}`,{
          headers:{
            Authorization: `bearer ${TOKEN}`
          }
        })
        const user = await response.json();
        console.log(user);
        let array: string[] = [];
        user.data.likedSongs.map((song: any) => {
          array.push(song._id);
        })
        setUserLikedSongs(array);   
      }
      getUser(); 
    // }
  },[])
  
  console.log(userLikedSongs);
  

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

  const addSong = (songId:string) => {
    console.log(songId, typeof songId);
    const putSongInUser = async(songId:string) => {
      const response = await fetch(`http://localhost:4002/track/library`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json; charset=utf-8',
          Authorization:`bearer ${TOKEN}`,
        },
        body: JSON.stringify({ _id: songId })
      })
      const data = await response.json();
      console.log(data.data.data);
      //Ahora tenemos que obtener los datos de este user para poder setear las canciones favoritas de nuevo

      if(data.ok){
        setTimeout(async()=>{
          const userResponse = await fetch(`http://localhost:4001/user/${id}`,{
            headers:{
              Authorization: `bearer ${TOKEN}`
            }
          })
          const user = await userResponse.json();
          console.log(user);
          let arrayFavouritesSongs: string[] = [];
          user.data.likedSongs.map((song:any) => {
            arrayFavouritesSongs.push(song._id)
          })
          setUserLikedSongs(arrayFavouritesSongs);
        },500)        
      }
    }
    putSongInUser(songId)
  }

  return (
    <div>
      <div className={styles.track_list_header}>
        <AlbumIcon />
        <p>{name || 'Album name'}</p>
      </div>
      <div className={styles.tracks_list}>
        {tracks?.map((track, index) => {
          return (
            <div key={index} className={styles.track_list_row}>
              <div className={styles.track_info}>
                <p>{index + 1}</p>
                <p className={styles.track_name}>{track.title}</p>
              </div>
              <div className={styles.buttons_container}>
                <IconButton color="inherit" component="label">
                  <input hidden />
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton color="inherit" component="label">
                  <input hidden />
                  {userLikedSongs?.some(element => element === track._id) ? <FavoriteIcon onClick={() => {addSong(track._id)}}/> : <FavoriteBorderIcon onClick={() => {addSong(track._id)}}/>}
                </IconButton>
                <p className={styles.track_duration}>
                  {millisToMinutes(track.duration)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
