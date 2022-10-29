import Layout from '../../components/Layout/Layout';
import ContactsContainer from '../../components/ContactsContainer/ContactsContainer';
import ChatRoom from '../../components/ChatRoom/ChatRoom';

import styles from './styles.module.css';
import Head from 'next/head';
import { useI18N } from '../../context/i18';

import { ReactEventHandler, useContext, useEffect, useRef, useState } from 'react'
import {Socket, io} from 'socket.io-client'
import { Playlist } from '../../interfaces/playlistResponse';
import { Album, Artist } from '../../interfaces/ServerResponse';
import { Track } from '../../interfaces/tracks';

import {socketService} from '../../socket/socket'
import { disconnectUserFromChat } from '../../socket/servicesSocket/services';
import { useCookies } from 'react-cookie';
import { countContext } from '../../context/countContext';
import { CollectionsOutlined } from '@mui/icons-material';

type Props = {
  setUserMessage: React.Dispatch<React.SetStateAction<number>>
};

let socketId;
//Array wich contains the connected users, each time a user make login into chat app, this array will be updated
let usuarios:{id:string, socketId:string, usuario: string}[] = [];

//Initialize the socket 
const socket: Socket = socketService;

const Chat = (props: Props) => {
  const { t } = useI18N();
  const [cookies, setCookie, removeCookie] = useCookies([
    'userID',
    'userToken',
    'username',
  ]);
  const token = cookies.userToken;
  //States to manage the renders of each component
  const {userMessage,setUserMessage, dataMessages, setDataMessages, previousPath, id2, setid2, pendingMessages, setPendingMessages} = useContext(countContext)
  const [input, setInput] = useState<string>("");  
  const [messages, setMessages] = useState<string[]>([""])
  const [socketUp, setSocketUp] = useState<Socket>(socket);
  const [users, setUsers] = useState<{
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
    likedSongs: Partial<Track>[];
  }[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("");//Nombre de la persona con la que se habla
  const [id1, setid1] = useState<string | undefined>();
  // const [id2, setid2] = useState<string | undefined>();
  const [userName, setUserName] = useState<string>("")
  const [room, setRoom] = useState<{ok:boolean, data:{_id:string}}>();
  // const [dataMessages, setDataMessages] = useState<{msg:string, from:string}>({msg:"", from:""})
  const [typing, setTyping] = useState<string>("");
  const [dataTyping, setDataTyping] = useState<string>("");
  // const [pendingMessages, setPendingMessages] = useState<{id:string, numberMessages:number}[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<{id:string,socketId:string,usuario:string}[]>([])
  const [widthWindow, setWidthWindow] = useState<number>(0);
  const [user, setUser] = useState<{
    _id:string,
    username: string;
    email: string;
    password: string;
    image: string;
    genres: string[];
    phone: string;
    chats?:{}[];
    playlists: Partial<Playlist>[];
    albums: Partial<Album>[];
    artists: Partial<Artist>[];
    likedSongs: Partial<Track>[];
  }>();
   //Take all the exists users on dataBase
   useEffect(() => {
    if(typeof window !== "undefined"){
      console.log(window.window.innerWidth)
      setWidthWindow(window.window.innerWidth)
    }
    const getUsers = async() => {
      const response = await fetch('http://localhost:4001/user',{
        headers:{
          Authorization:`Bearer ${token}`
        },        
      });
      const data1 = await response.json();
      setUsers(data1.data)  
      setUserName(cookies.username)//Here we will set the name of user account
      setid1(cookies.userID)//Here we set the id of user account
    }
    getUsers();
  },[])

  //Take the lastest open room, as current room
  useEffect(() => {
    const userName = users.find((user: { _id: string | undefined; }) => user._id == id1)
    setUserName(cookies.username)
    socket.emit('update_list', { id: `${cookies.userID}`, usuario: cookies.username, action: 'login' });
    socket.on('session_update', function(data, socket){
      socketId = socket;
      usuarios = data;
      
      // Lista de usuarios conectados
      console.log(usuarios)
      setConnectedUsers(usuarios)
    });
    socket.emit("connected", cookies.userID)
    const currentRoom = async () => {
    const responseCurrentRoom = await fetch("http://localhost:4001/chat/currentRoom",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const room = await responseCurrentRoom.json();
      
      if(room != undefined && room.msg != "No current chat"){
        setRoom(room);
        setCurrentRoom(room.data.username);
        setid2(room.data._id);
      }
      const response1 = await fetch('http://localhost:4001/chat/pendingMessages',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      const pending = await response1.json();
      let arrayPendingMessages: {id:string, numberMessages:number}[] = [];
      pending.data.map((chat: any) => {
        chat.pendingMessages != 0 && arrayPendingMessages.push({id:chat.toUser, numberMessages: chat.pendingMessages})
        if(chat.toUser == id2 && id2 != undefined){console.log("BUG")
          // userMessage > 0 && setUserMessage(userMessage-chat.pendingMessages)
        }
      })
      console.log(pendingMessages)
      console.log(arrayPendingMessages)
      if(pendingMessages == arrayPendingMessages)setPendingMessages(arrayPendingMessages);
    }
    currentRoom();
  },[id1, socketUp])//socketUp

  //Charge the messages of the current room, after set de id2 and current room
  useEffect(() => {
    const getMessagesOfCurrentRoom = async (idCurrentRoom:any) => {
          if(currentRoom != undefined){
          const responseOfCurrentRoom = await fetch("http://localhost:4001/chat/getMessages",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({toUserId:id2})
          })
          const dataMessages = await responseOfCurrentRoom.json();
          setMessages(dataMessages.data)
        }
      }
      if(room != undefined && room.msg != "No current chat"){
        getMessagesOfCurrentRoom(room?.data._id)
      }
  },[room])
  
  useEffect(()=>{
  socket.on(`${cookies.userID}`, (data:any) => {
    setDataMessages(data);//Set the message
      console.log(data)
      // if(typeof window !== undefined){
      //   //If the user is not in chat frame
      //   if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1] != 'chat'){console.log("Entrando")
      //     setUserMessage((prevUserMessage)=>prevUserMessage+1)//Set up 1 the userMessages
      //     if(pendingMessages.length > 0){//if exists pending messages 
      //       pendingMessages.map(pm => {
      //         console.log(pm)
      //         if (pm.id == data.from ) pm.numberMessages += 1;
      //       })
      //       console.log(pendingMessages)
      //       setPendingMessages(pendingMessages);
      //     }else{
      //       setPendingMessages([...pendingMessages,{id:data.from, numberMessages:1}])
      //     }
      //   }else{//If user is in chat tab
      //     // (id2 == data.from && id2 != undefined) && deletePendingMessage(id2);
      //     if(data.from != id2 && id2 != undefined && data.from != cookies.userID){//If user is not talking with Id2
      //       setUserMessage((prevUserMessage)=>prevUserMessage+1);
      //       if(pendingMessages.length > 0){//if exists pending messages 
      //         pendingMessages.map(pm => {
      //           console.log(pm)
      //           if (pm.id == data.from ) pm.numberMessages += 1;
      //         })
      //         console.log(pendingMessages)
      //         setPendingMessages(pendingMessages);
      //       }else{
      //         setPendingMessages([...pendingMessages,{id:data.from, numberMessages:1}])
      //       }
      //     }
      //   }
      // }
      //Update the count of pending messages to the navBar
      // const updateNumberMessages = async () => {
      //   const response = await fetch(`http://localhost:4001/user/${cookies.userID}`,{
      //     headers:{
      //       authorization: `Bearer ${token}`
      //     }
      //   })
      //   const data1 = await response.json();
      //   let count: number = 0;
      //   console.log(pendingMessages)
      //   data1.data.chats.map((chat:any) => {
      //     count += chat.pendingMessages
      //     if(typeof window != undefined){
      //       if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1] != 'chat'){console.log("Entrando")
      //         count == 0 && count++;
      //       }
      //     }
      //   })
      //   setUserMessage(count)
      // }
      // updateNumberMessages();
  })
  socket.on('typing', (data:any) => {     
    setTyping(data);      
  })
  return () => {
    socket.off(`${cookies.userID}`);
    socket.off('typing');
  }
  },[cookies.userID])
  // socket.on('typing', (data:any) => {     
  //   setTyping(data);      
  // })

  //Update the message for the currentRoom or update the pendingMessage if the user is disconnected
  useEffect(() => {
    console.log("ACTUALIZANDO MENSAJES")
    console.log(dataMessages)
    console.log(id2)
    if(dataMessages.from == id2 || dataMessages.from == id1) {//If message comes from one of the actual talkers
      console.log(pendingMessages)
      if(previousPath != window.location.pathname.split('/')[window.location.pathname.split('/').length-1]){//If message comes from id2 and id1 was in other frame
        //We must to update the user message contact
      }
        setUserMessage(userMessage)//Comprobar si vale
        setMessages((prevMessages) => {return [...prevMessages, dataMessages.msg]})
    }
    if(typeof window !== undefined){
      //If the user is not in chat frame
      console.log(previousPath)
      console.log(window.location.pathname.split('/')[window.location.pathname.split('/').length-1])
      if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1] != 'chat'){
        console.log("No viene de chat")
        setUserMessage((prevUserMessage)=>prevUserMessage+1)//Set up 1 the userMessages
        if(pendingMessages.length > 0){//if exists pending messages 
          pendingMessages.map(pm => {
            console.log(pm)
            if (pm.id == dataMessages.from ) pm.numberMessages += 1;
          })
          console.log(pendingMessages)
          setPendingMessages(pendingMessages);
        }else{
          setPendingMessages([...pendingMessages,{id:dataMessages.from, numberMessages:1}])
        }
      }else{//If user is in chat tab
        console.log("Esta en chat");
        (id2 == dataMessages.from && id2 != undefined) && deletePendingMessage(id2);//Si nos escribe estando en el chat borra los pending messages de ese chat
        //comprobamos si venia de otra pagina distinta al chat
        if(dataMessages.from != id2 && id2 != undefined && dataMessages.from != cookies.userID){//If user is not talking with Id2
          console.log("El mensaje no viene de la currentRoom ni de nosotros")
          setUserMessage((prevUserMessage)=>prevUserMessage+1);
          if(pendingMessages.length > 0){//if exists pending messages 
            pendingMessages.map(pm => {
              console.log(pm)
              if (pm.id == dataMessages.from ) pm.numberMessages += 1;
            })
            console.log(pendingMessages)
            setPendingMessages(pendingMessages);
          }else{
            setPendingMessages([...pendingMessages,{id:dataMessages.from, numberMessages:1}])
          }
        }
      }
    }
    // else{
    //   const exist = pendingMessages.find(chat => chat.id == dataMessages.from);
    //   console.log("ELSE", exist)
    //   if(exist != undefined) {
    //     pendingMessages.map(msg => {
    //       if(msg.id == dataMessages.from){
    //         msg.numberMessages += 1
    //         setUserMessage(userMessage+1)
    //       } 
    //     })        
    //     setPendingMessages(pendingMessages)
    //   }else{
    //     if(dataMessages.from != ''){
    //       const idUser = dataMessages.from;        
    //       setPendingMessages([...pendingMessages,{id:idUser, numberMessages:1}])
    //       setUserMessage(userMessage+1)
    //     }
    //   }
    // }
  },[dataMessages])

  //Set if a user is typing
  useEffect(() => {
    setDataTyping(typing);
  }, [typing])

  //Delete messages no read when the user goes to that room
  const deletePendingMessage = (userId:string | undefined) => {
    console.log(previousPath)
    const messagesAllreadyPending = pendingMessages.filter(chat => chat.id != userId);
    let count: number = 0;
    messagesAllreadyPending.map(chat=>{
      count += chat.numberMessages
    })
    setUserMessage(count);
    setPendingMessages(messagesAllreadyPending);
    //Should call to the function in dataBase to put to 0 the pendingMessages of the chat
    const deleteInDataBasePendingMessages = async () => {
    const response = await fetch('http://localhost:4001/chat/deletePendingMessages',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({toUserId:id2})
    })
    const data = await response.json();
    }
    deleteInDataBasePendingMessages();  
  }
  const [contacts, setContacts] = useState<boolean>(true);
  
  useEffect(()=>{
    setWidthWindow(window.window.innerWidth)
    window.addEventListener('resize', resizeWindow)
  },[widthWindow])

  const resizeWindow = () => {
    setWidthWindow(window.window.innerWidth)
  }  
  return (
    <>
      <Head>
        <title>
          {`${t('additional').app_name} - ${t('headers').headerChat}`}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.chat_container}>
          <h1> {t('additional').messages}</h1>
          <div className={styles.main_content}>
            {(contacts == true && widthWindow<901) && <ChatRoom setContacts={setContacts} messages={messages} setMessages={setMessages} deletePendingMessage={deletePendingMessage} currentRoom={currentRoom} id1={id1} id2={id2} socket={socket} input={input} setInput={setInput} usersConnected={connectedUsers} pendingMessages={pendingMessages} userName={userName} typing={typing} users={users}/>}
            {(contacts == false && widthWindow<901) && <ContactsContainer setContacts={setContacts} users={users} usersConnected={connectedUsers} deletePendingMessage={deletePendingMessage} socket={socket} id1={id1} id2={id2} setid2={setid2} setCurrentRoom={setCurrentRoom} setMessages={setMessages} pendingMessages={pendingMessages}/>}
            {
              widthWindow >=901 &&
              <>
                <ChatRoom setContacts={setContacts} messages={messages} setMessages={setMessages} deletePendingMessage={deletePendingMessage} currentRoom={currentRoom} id1={id1} id2={id2} socket={socket} input={input} setInput={setInput} usersConnected={connectedUsers} pendingMessages={pendingMessages} userName={userName} typing={typing} users={users}/>
                <ContactsContainer setContacts={setContacts} users={users} usersConnected={connectedUsers} deletePendingMessage={deletePendingMessage} socket={socket} id1={id1} id2={id2} setid2={setid2} setCurrentRoom={setCurrentRoom} setMessages={setMessages} pendingMessages={pendingMessages}/>
              </>
            }
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Chat;
