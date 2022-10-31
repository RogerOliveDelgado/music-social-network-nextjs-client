import Image from 'next/image';
import React, { useContext } from 'react';
import { Artist, Album } from '../../interfaces/ServerResponse';
import { Playlist } from '../../interfaces/playlistResponse';
import { Track } from '../../interfaces/tracks';
import styles from './styles.module.css';
import { countContext } from '../../context/countContext';

type Props = {
  name: string;
  image: string;
  active: boolean;
  setid2: React.Dispatch<React.SetStateAction<string | undefined>>
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>,
  user: {
    _id: string,
    username: string;
    email: string;
    password: string;
    image: string;
    genres: string[];
    phone: string;
    playlists: Partial<Playlist>[];
    albums: Partial<Album>[];
    artists: Partial<Artist>[];
    likedSongs: Partial<Track>[];
  },
  handleUser: Function,
  id1:string | undefined,
  pendingMessages:{id:string, numberMessages:number}[],
  setContacts: React.Dispatch<React.SetStateAction<boolean>>
};

const Contact = (props: Props) => {
  const {pendingMessages} = useContext(countContext)
  let userMessages:{id:string, numberMessages:number} | undefined
  // if(props.user._id != props.id1){
    userMessages= pendingMessages.find(chat => chat.id == props.user._id)//props.pendingMessages
  // }

  const handleContacts = () => {
    props.setContacts(true);
  }
  return (
    <div
      className={`${styles.contact_container} ${
        props.active && styles.contact_container_active
      }`}
      onClick={()=>{props.setCurrentRoom(props.user.username); props.setid2(props.user._id);props.handleUser(props.user.username, props.user._id);handleContacts()}}
    >
      <div className={styles.contact_image}>
        <Image
          src={props.user.image}
          alt="contact_default"
          width={50}
          height={50}
          layout="fixed"
        />
      </div>
      <p className={styles.contact_name}>{props.name}</p>
      {
        (userMessages?.numberMessages == 0 || userMessages?.numberMessages== undefined) ? <span></span> : <span style={{display:'flex', alignItems:'center', justifyContent:'center',width:'2rem', height:'2rem', borderRadius:'50%', backgroundColor:'rgb(120, 227, 120)'}}>{userMessages?.numberMessages}</span>
      }
    </div>
  );
};

export default Contact;
