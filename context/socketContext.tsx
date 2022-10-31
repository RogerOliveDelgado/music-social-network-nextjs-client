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
//Initialize socket
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

  

  return(
    <socketContext.Provider value={{socket, setSocket,typing, setTyping, connectedUsers, setConnectedUsers}}>{children}</socketContext.Provider>
  )
}