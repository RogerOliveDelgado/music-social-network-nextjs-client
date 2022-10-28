import Image from 'next/image';
import React from 'react';
import { Artist } from '../../interfaces/artistResponse';
import { Playlist } from '../../interfaces/playlistResponse';
import { Data } from '../../interfaces/tracks';
import { Album } from '../../interfaces/albumResponse';
import styles from './styles.module.css';

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
    likedSongs: Partial<Data>[];
  },
  handleUser: Function,
  id1:string | undefined,
  pendingMessages:{id:string, numberMessages:number}[],
  setContacts: React.Dispatch<React.SetStateAction<boolean>>
};

const Contact = (props: Props) => {
  let userMessages:{id:string, numberMessages:number} | undefined
  if(props.user._id != props.id1){
    userMessages= props.pendingMessages.find(chat => chat.id == props.user._id)
  }

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
        userMessages == undefined ? <span></span> : <span style={{display:'flex', alignItems:'center', justifyContent:'center',width:'2rem', height:'2rem', borderRadius:'50%', backgroundColor:'rgb(120, 227, 120)'}}>{userMessages?.numberMessages}</span>
      }
    </div>
  );
};

export default Contact;
