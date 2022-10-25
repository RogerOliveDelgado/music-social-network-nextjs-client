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
  handleUser: Function
};

const Contact = (props: Props) => {
  return (
    <div
      className={`${styles.contact_container} ${
        props.active && styles.contact_container_active
      }`}
      onClick={()=>{props.setCurrentRoom(props.user.username); props.setid2(props.user._id);props.handleUser(props.user.username, props.user._id)}}
    >
      <div className={styles.contact_image}>
        <Image
          src={props.image}
          alt="contact_default"
          width={50}
          height={50}
          layout="fixed"
        />
      </div>
      <p className={styles.contact_name}>{props.name}</p>
      <p>2:30PM</p>
    </div>
  );
};

export default Contact;
