import Contact from '../Contact/Contact';
import React, { useState } from 'react';
import styles from './styles.module.css';
import { useI18N } from '../../context/i18';

import {Playlist} from '../../interfaces/playlistResponse'
import {Album} from '../../interfaces/albumResponse'
import {Artist} from '../../interfaces/artistResponse'
import {Data} from '../../interfaces/tracks'
import { Socket } from 'socket.io-client';

type Props = {
  users: {
      _id:string,
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
    }[],
  usersConnected:{id:string, socketId:string, usuario: string}[],
  socket: Socket,
  id1:string | undefined,
  id2:string | undefined,
  setid2: React.Dispatch<React.SetStateAction<string | undefined>>,
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<string[]>>,
  deletePendingMessage: Function
};

const ContactsContainer = (props: Props) => {
  const [activeContact, setActiveContact] = useState(0);
  const { t } = useI18N();

  const actvateRoom = (id: number) => {
    setActiveContact(id);
  };

  //Here we have to access to the usersId on usersConnected
  const handleUser = async(value:any, userId:string) => {
    props.socket.emit(`typing`, {msg:``, to:`${props.id2}`, sender:`${props.id1}`, socket:props.socket.id})//set to '' message typing
    props.deletePendingMessage(props.id2)//userId
    props.setid2(userId)
    props.setCurrentRoom(value)
    
      
    props.setMessages([])
    //recogemos los mensajes cada vez que cambiamos de chat
    const response = await fetch("http://localhost:5001/getMessages",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({sender:props.id1,receiver:userId})
    })
    const msgs = await response.json();
    console.log(msgs.msgs)
    if(msgs.msgs == undefined){
      props.setMessages([""]);
    }else{
      props.setMessages(msgs.msgs)
    }
  }

  return (
    <div className={styles.contacts_container}>
      <h2>{t('additional').contacts}</h2>
      <div className={styles.contacts_wrapper}>
        {/* Make a map to print all the users */}
        {
          props.users.map((user, index) => {
            return (
              <Contact
                key={index}
                name={`${user.username}`}
                active={props.usersConnected.find(userConn => userConn.name == user.username) ? true : false}
                image="/Images/contact_default_male.png"
                setCurrentRoom={props.setCurrentRoom}
                setid2={props.setid2}
                handleUser={handleUser}
                user={user}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default ContactsContainer;
