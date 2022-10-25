import Layout from '../../components/Layout/Layout';
import ContactsContainer from '../../components/ContactsContainer/ContactsContainer';
import ChatRoom from '../../components/ChatRoom/ChatRoom';

import styles from './styles.module.css';
import Head from 'next/head';
import { useI18N } from '../../context/i18';

import { ReactEventHandler, useEffect, useRef, useState } from 'react'
import {io} from 'socket.io-client'

type Props = {};

let socketId;
//Array wich contains the connected users, each time a user make login into chat app, this array will be updated
let usuarios = [];

//Initialize the socket 
const socket = io(`https://chat-backend-turbofieras.herokuapp.com`);

const Chat = (props: Props) => {
  const { t } = useI18N();

  //States to manage the renders of each component
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<string[]>(["hola"])
  const [users, setUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState<string>("Julio");//Nombre de la persona con la que se habla
  const [id1, setid1] = useState<string>();
  const [id2, setid2] = useState<string>();
  const [inputUser,setInputUser] = useState("");
  const [userName, setUserName] = useState<string>("")
  const [dataMessages, setDataMessages] = useState<{msg:string, from:string}>({msg:"", from:""})
  const [typing, setTyping] = useState<string>("");
  const [dataTyping, setDataTyping] = useState<string>("");
  const [pendingMessages, setPendingMessages] = useState<{id:string, numberMessages:number}[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<{idSocket:string, id:string, usuario:string}[]>([])

   //Take all the exists users on dataBase
   useEffect(() => {
    const getUsers = async() => {
      const response = await fetch('http://localhost:5001/users');
      const data1 = await response.json();
      setUsers(data1.msg)  
      if(window.location.host == "localhost:3000"){
        console.log(data1.msg[0].name);//Nombre del usuario(tu nombre)
      setUserName("Juan Carlos")//Here we will set the name of user account
      setid1("633ee940468b79f49c802296")//Here we set the id of user account
      setid2("633ee8ec468b79f49c802292")//This line is in line 62, here this line should be deleted
      setCurrentRoom("Alicia")
      
      }
      //this if bellow will be deleted is only for test
      if(window.location.host == "localhost:3001"){
        setUserName("Alicia")
        setUsers(data1.msg)  
        setid1("633ee8ec468b79f49c802292")
        setid2("633ee940468b79f49c802296")//Prueba
        setCurrentRoom("Juan Carlos")
      }
    }
    getUsers();
  },[])

  //Take the lastest open room, as current room
  useEffect(() => {
    if(window.location.host == 'localhost:3000'){
      socket.emit('update_list', { id: `${id1}`, usuario: 'Juan Carlos', action: 'login' });
    }else{
      socket.emit('update_list', { id: `${id1}`, usuario: 'Alicia', action: 'login' });
    }
    socket.on('session_update', function(data, socket){
      socketId = socket;
      usuarios = data;
      
      // Lista de usuarios conectados
      console.log(usuarios);
      setConnectedUsers(usuarios)
    });
    socket.emit("connected", id1)
    const currentRoom = async () => {
    const responseCurrentRoom = await fetch("http://localhost:5001/currentRoom",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({user:window.location.host == "localhost:3000" ? id1 : id2})
      });
      const room = await responseCurrentRoom.json();
      
      console.log(room);
      console.log(room.name);
      setCurrentRoom(room.name);
      // setid2(room.currentRoom);
      getMessagesOfCurrentRoom(room.currentRoom)
      if(window.location.host == "localhost:3001"){
        setCurrentRoom("Juan Carlos")
      }
      const response1 = await fetch('http://localhost:5001/pendingMessages',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({user:id1, receiver:id2})
      })
      const pending = await response1.json();
      console.log("PENDING MESSAGES",pending)//pending.msg.chats
      let arrayPendingMessages: {id:string, numberMessages:number}[] = [];
      id2 != null && pending.msg.chats.map((chat: any) => {
        chat.pendingMessages != 0 && arrayPendingMessages.push({id:chat.receiver, numberMessages: chat.pendingMessages})
      })
      setPendingMessages(arrayPendingMessages);
    }
    currentRoom();
  },[id1])

  //Charge the messages of the current room, after set de id2 and current room
  const getMessagesOfCurrentRoom = async (idCurrentRoom:any) => {
      console.log("currentRoom",idCurrentRoom);
      console.log("id1",id1);
      console.log("id2",id2);
      if(currentRoom != undefined){
      const responseOfCurrentRoom = await fetch("http://localhost:5001/getMessages",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({sender:window.location.host == "localhost:3000" ? id1 : id2, receiver:window.location.host == "localhost:3000" ?id2:id1})
      })
      const dataMessages = await responseOfCurrentRoom.json();
      console.log("ROGER", dataMessages.msgs)
      setMessages(dataMessages.msgs)
    }
  }

  //Hearing into the client to receive the sended message and update these messages in DB
  useEffect(() => {    
    socket.on(`${id1}`, (data:any) => {
      // console.log("currentRoom", currentRoom);
      // console.log("id2", id2);
      // console.log("Mensaje de:", data.from);
      // console.log("Booelan", id2 == data.from || id1 == data.from);  
      console.log(data)
      setDataMessages(data);
    })

    socket.on('typing', (data:any) => {     
      console.log("ME ESCRIBEN", data.split(" is ")[0], "currentRom", currentRoom);
      setTyping(data);      
    })
  },[id2])

  //Update the message for the currentRoom or update the pendingMessage if the user is disconnected
  useEffect(() => {
    if(dataMessages.from == id2 || dataMessages.from == id1) {
      setMessages((prevMessages) => {return [...prevMessages, dataMessages.msg]})
    }else{
      const exist = pendingMessages.find(chat => chat.id == dataMessages.from);
      console.log(exist);
      console.log(pendingMessages);
      
      if(exist != undefined) {
        pendingMessages.map(msg => {
          if(msg.id == dataMessages.from) msg.numberMessages += 1
        })
        
        setPendingMessages(pendingMessages)
      }else{
        if(dataMessages.from != ''){
        const idUser = dataMessages.from;        
        setPendingMessages([...pendingMessages,{id:idUser, numberMessages:1}])
        
      }
    }
  }
  },[dataMessages])

  //Set if a user is typing
  useEffect(() => {
    console.log(typing);
    setDataTyping(typing);
  }, [typing])

  // const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   if(messagesEndRef.current != null)
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth", block:'end' });
    
  //     const field = document.getElementById("fieldset");
  //     field && (field.scrollTop = field.scrollHeight);
  // };

  // useEffect(scrollToBottom, [messages]);

  //set the input message value
  const handleInput = (value:string) => {    
    if(window.location.host == "localhost:3000"){
      console.log("Escribiendo");
      
      setInput(value);
      if(value == ""){
        socket.emit(`typing`, {msg:``, to:`${id2}`, sender:`${id1}`, socket:socket.id})
      }else{
      socket.emit(`typing`, {msg:`${userName} is typing`, to:`${id2}`, sender:`${id1}`, socket:socket.id})
      }
      
    }else{
      setInput(value);
      socket.emit(`typing`, {msg:`${userName} is typing`, to:`${id2}`, sender:`${id1}`, socket:socket.id})
    }
  }

  //send the message
  const submitMessage = async() => {
    console.log(window.location.host);
    if(input != ""){
    if(window.location.host == "localhost:3000"){
      // const id = id1;
      // console.log("sender",id1);
      // console.log("receiver", id2);      
      // console.log("name", currentRoom); 

      socket.emit(`send-Message`, {msg:`${userName}:${input}`, to:`${id2}`, sender:`${id1}`, socket:socket.id})
      socket.emit(`typing`, {msg:``, to:`${id2}`, sender:`${id1}`, socket:socket.id})
      // console.log(data);
      console.log(pendingMessages);
      const response = await fetch("http://localhost:5001/messages",{
        method:'POST',
        headers:{
          // "Access-Control-Allow-Origin":'*',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({sender: id1, receiver: id2, msgs:`${userName}:${input}`, name:currentRoom, users: connectedUsers})
      })
    const dataResponse = await response.json()
    console.log("MSG",dataResponse);
      
    }else{
      // const id = id2;
      // console.log(id2);
      console.log(pendingMessages);
      socket.emit(`send-Message`, {msg:`${userName}:${input}`, to:`${id2}`, sender:`${id1}`, socket:socket.id})
      socket.emit(`typing`, {msg:``, to:`${id2}`, sender:`${id1}`, socket:socket.id})
    }
    }
    console.log(pendingMessages);
    // console.log(socket.id);
    setInput("");
  }

  //Charge the messages of currentRoom when the user moves between users
  const handleUser = async(value:any, userId:string) => {
    socket.emit(`typing`, {msg:``, to:`${id2}`, sender:`${id1}`, socket:socket.id})//set to '' message typing
    setInputUser(value);
    deletePendingMessage(id2)//userId
    setid2(userId)
    setCurrentRoom(value)
    
      
    setMessages([])
    //recogemos los mensajes cada vez que cambiamos de chat
    const response = await fetch("http://localhost:5001/getMessages",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({sender:id1,receiver:userId})
    })
    const msgs = await response.json();
    console.log(msgs.msgs)
    if(msgs.msgs == undefined){
      setMessages([""]);
    }else{
      setMessages(msgs.msgs)
    }
  }

  //Delete messages no read when the user goes to that room
  const deletePendingMessage = (userId:string | undefined) => {
    const messagesAllreadyPending = pendingMessages.filter(chat => chat.id != userId);
    setPendingMessages(messagesAllreadyPending);
    //Should call to the function in dataBase to put to 0 the pendingMessages of the chat
    const deleteInDataBasePendingMessages = async () => {
    const response = await fetch('http://localhost:5001/deletePendingMessages',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({user:id1, receiver:id2})
    })
    const data = await response.json();
    console.log("DELETING",data)
    }
    deleteInDataBasePendingMessages();
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
            <ChatRoom messages={messages} setMessages={setMessages}/>
            <ContactsContainer />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Chat;
