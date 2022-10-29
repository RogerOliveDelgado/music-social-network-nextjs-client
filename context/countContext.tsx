import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
interface contextProps{
  userMessage: number,
  setUserMessage: React.Dispatch<React.SetStateAction<number>>
}

interface props{
  children: JSX.Element | JSX.Element[]
}
//Context
export const countContext = createContext<contextProps>({} as contextProps);

//Provider
export const CountMessageProvider = ({children}:props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'userID',
    'userToken',
    'username',
  ]);
  const [userMessage, setUserMessage] = useState<number>(0);
  useEffect(()=> {
    const updateNumberMessages = async () => {
        const response1 = await fetch('http://localhost:4001/chat/pendingMessages',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${cookies.userToken}`,
          }
        })
        const pending = await response1.json();
        let count: number = 0;
        pending.data.map((chat: any) => {       
          if(chat.pendingMessages != 0){
            count += chat.pendingMessages;
            console.log(chat);
            
          }
        })
        console.log("contando",count)
        setUserMessage(count)
      }      
      updateNumberMessages();
  },[cookies.userToken])
  

  return(
    <countContext.Provider value={{userMessage, setUserMessage}}>{children}</countContext.Provider>
  )
}