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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU5NDc4ZGNjM2I0YTllM2Q0NzBmNjciLCJ1c2VybmFtZSI6Imp1YW5reSIsImlhdCI6MTY2Njg1NDk3MSwiZXhwIjoxNjY3Mjg2OTcxfQ.uOmmmsy3TFUv_PoiE1cZeva4Ep0uNHvMcHJiYWY1Be0";
  const actvateRoom = (id: number) => {
    setActiveContact(id);
  };

  //Here we have to access to the usersId on usersConnected
  const handleUser = async(value:any, userId:string) => {
    props.socket.emit(`typing`, {msg:``, to:`${props.id2}`, sender:`${props.id1}`, socket:props.socket.id})//set to '' message typing
    props.deletePendingMessage(props.id2)//userId
    props.setid2(userId)
    props.setCurrentRoom(value)
    console.log("CAMBIO USER", userId)
      
    props.setMessages([])
    //recogemos los mensajes cada vez que cambiamos de chat
    const response = await fetch("http://localhost:4001/chat/getMessages",{
      method:'POST',
      headers:{
        'Content-Type':'application/json', 
        Authorization:`Bearer ${token}`,
      },
      body:JSON.stringify({toUserId:userId})
    })
    const msgs = await response.json();
    console.log(msgs)
    if(msgs.data == undefined){
      props.setMessages([""]);
    }else{
      props.setMessages(msgs.data)
    }
  }
  console.log(props.users);
  
  return (
    <div className={styles.contacts_container}>
      <h2>{t('additional').contacts}</h2>
      <div className={styles.contacts_wrapper}>
        {/* Make a map to print all the users */}
        {
          props.users.map((user, index) => {
            if(user._id != props.id1){
              // let userMessages:{id:string, numberMessages:number} | undefined = pendingMessages.find(chat => chat.id == user._id)

            return (
              <>
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
              {/* {userMessages != undefined && 
                <span>{userMessages?.numberMessages}</span>
                // <div style={{width:'0.5rem', height:'0.5rem', borderRadius:'50%', backgroundColor:'red'}}></div>
                } */}
                </>
            )
            }
          })
        }
      </div>
    </div>
  );
};

export default ContactsContainer;
