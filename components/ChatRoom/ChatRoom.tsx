import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Message from '../Message/Message';

import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';
import { useI18N } from '../../context/i18';

import {Socket} from 'socket.io-client'

type Props = {
  messages: string[],
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<string[]>>,
  currentRoom: string,
  id1: string | undefined,
  id2: string | undefined,
  socket: Socket,
  usersConnected:{id:string, socketId:string, usuario: string}[]
};

const ChatRoom = (props: Props) => {
  const chat = useRef(null);
  const { t } = useI18N();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU5NDc4ZGNjM2I0YTllM2Q0NzBmNjciLCJ1c2VybmFtZSI6Imp1YW5reSIsImlhdCI6MTY2Njc5NTQwNSwiZXhwIjoxNjY3MjI3NDA1fQ.1D_cKUwpwPuy-jS2Bs0AwmiXNSQLnB4SdzRqIWKlQSw";
  useEffect(() => {
    chat && chat.current.scrollTo(0, chat.current.scrollHeight, 'smooth');
    // chat && console.log(chat);
  }, []);

  //set the input message value
  const handleInput = (value:string) => {    
    if(window.location.host == "localhost:3000"){
      console.log("Escribiendo");
      
      props.setInput(value);
      if(value == ""){
        props.socket.emit(`typing`, {msg:``, to:`${props.id2}`, sender:`${props.id1}`, socket:props.socket.id})
      }else{
        props.socket.emit(`typing`, {msg:`${props.currentRoom} is typing`, to:`${props.id2}`, sender:`${props.id1}`, socket:props.socket.id})//currentRoom por userName
      }
      
    }else{
      props.setInput(value);
      props.socket.emit(`typing`, {msg:`${props.currentRoom} is typing`, to:`${props.id2}`, sender:`${props.id1}`, socket:props.socket.id})//currentRoom por userName
    }
  }

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if(messagesEndRef.current != null)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block:'end' });
    
      const field = document.getElementById("fieldset");
      field && (field.scrollTop = field.scrollHeight);
  };

  useEffect(scrollToBottom, [props.messages]);

  //send the message
  const submitMessage = async() => {
    console.log(window.location.host);
    if(props.input != ""){
      if(window.location.host == "localhost:3000"){
        // const id = id1;
        // console.log("sender",id1);
        // console.log("receiver", id2);      
        // console.log("name", currentRoom); 

        props.socket.emit(`send-Message`, {msg:`${props.currentRoom}:${props.input}`, to:`${props.id2}`, sender:`${props.id1}`, socket:props.socket.id})
        props.socket.emit(`typing`, {msg:``, to:`${props.id2}`, sender:`${props.id1}`, socket:props.socket.id})
        // console.log(data);
        const response = await fetch("http://localhost:4001/chat/messages",{
          method:'POST',
          headers:{
            // "Access-Control-Allow-Origin":'*',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({to: props.id2, messages:`${props.currentRoom}:${props.input}`,users: props.usersConnected})
        })
      const dataResponse = await response.json()
      console.log("MSG",dataResponse);        
      }
    }
    // console.log(socket.id);
    props.setInput("");
  }

  return (
    <div className={styles.chat_room_container}>
      <div className={styles.chat_room_header}>
        <IconButton aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Image
          className={styles.chat_room_image}
          src="/Images/contact_default_male.png"
          alt="contact_default"
          height={50}
          width={50}
          layout="fixed"
        />
        <p className={styles.contact_name}>{props.currentRoom != "" ? props.currentRoom : "Abre un chat"}</p>
      </div>
      <div className={styles.messages_container} ref={chat}>
        {/* Here make an map to print each message */}
        {
          props.messages.map((message, index) => {
            return(
              <Message
                key={index}
                image={'/Images/contact_default_male.png'}
                text={message}
              />
            )
          })
        }
      </div>
      <div className={styles.message_input}>
        <form className={styles.message_form}>
          <input
            className={styles.input_message}
            value={props.input}
            type="text"
            name="input"
            id="input_text"
            onChange={(e)=>handleInput(e.target.value)}
            placeholder={`${t('additional').message} Roger Olvié`}
          />
          <Button variant="contained" size="small" endIcon={<SendIcon onClick={submitMessage}/>} >
            {t('additional').send}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
