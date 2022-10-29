import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { Socket } from "socket.io-client";
import { socketService } from "../socket/socket";
import { countContext } from "./countContext";

interface contextProps{
  typing: string,
  setTyping: React.Dispatch<React.SetStateAction<string>>,
  connectedUsers: {id:string,socketId:string,usuario:string}[],
  setConnectedUsers: React.Dispatch<React.SetStateAction<{id:string,socketId:string,usuario:string}[]>>,
  socket:Socket,
  setSocket: React.Dispatch<React.SetStateAction<Socket>>
}

interface props{
  children: JSX.Element | JSX.Element[]
}

export const socketContext = createContext<contextProps>({} as contextProps);

let socketId;
//Array wich contains the connected users, each time a user make login into chat app, this array will be updated
let usuarios:{id:string, socketId:string, usuario: string}[] = [];
const socketUser: Socket = socketService;
export const SocketProvider = ({children}:props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'userID',
    'userToken',
    'username',
  ]);
  const {messages, setMessages, pendingMessages, setPendingMessages,id2, setid2,previousPath, setPreviousPath,userMessage, setUserMessage,dataMessages, setDataMessages} = useContext(countContext)
  const [typing, setTyping] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<{id:string,socketId:string,usuario:string}[]>([])
  const [socket, setSocket] = useState<Socket>(socketUser);

  useEffect(()=> {
    console.log("Entrando en provider")
    socket.emit('update_list', { id: `${cookies.userID}`, usuario: cookies.username, action: 'login' });
    socket.on('session_update', function(data, socket){
      socketId = socket;
      usuarios = data;
      
      // Lista de usuarios conectados
      console.log(usuarios)
      setConnectedUsers(usuarios)
    });
    socket.on(`${cookies.userID}`, (data:any) => {
      setDataMessages(data);
      console.log(data)
      //Si la localizacion actual es el chat
      if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1] == "chat"){
        //Entonces se comprueba si el mensaje viene del chat actual
        if(dataMessages.from == id2 || dataMessages.from == cookies.userID) {//If message comes from one of the actual talkers
          console.log(pendingMessages)
          if(previousPath != window.location.pathname.split('/')[window.location.pathname.split('/').length-1]){//If message comes from id2 and id1 was in other frame
            //We must to update the user message contact
          }
          setUserMessage(userMessage)//Comprobar si vale
          setMessages((prevMessages) => {return [...prevMessages, dataMessages.msg]})
        }else{
          //Sino viene de ese chat
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
      }else{
        //Si la localizacion actual es otra pagina que no es el chat
        if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1] != 'chat'){
          console.log("No viene de chat")
          //se aumenta en 1 el userMessage
          setUserMessage((prevUserMessage)=>prevUserMessage+1)//Set up 1 the userMessages
          if(pendingMessages.length > 0){//if exists pending messages 
            pendingMessages.map(pm => {
              console.log(pm)
              if (pm.id == dataMessages.from ) pm.numberMessages += 1;
            })
            console.log(pendingMessages)
            //se actualizan los pendingMessages
            setPendingMessages(pendingMessages);
          }else{
            //se actualizan los pendingMessages
            setPendingMessages([...pendingMessages,{id:dataMessages.from, numberMessages:1}])
          }
        }
      } 
    })
    socket.on('typing', (data:any) => {     
      setTyping(data);      
    })

    socket.off(`${cookies.userID}`);
    socket.off('typing');
    socket.off('update_list');
    socket.off('session_update');

  },[cookies.userID])
  

  return(
    <socketContext.Provider value={{socket, setSocket,typing, setTyping, connectedUsers, setConnectedUsers}}>{children}</socketContext.Provider>
  )
}