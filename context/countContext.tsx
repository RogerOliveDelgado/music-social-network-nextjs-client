import { stringify } from "querystring";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
interface contextProps{
  userMessage: number,
  setUserMessage: React.Dispatch<React.SetStateAction<number>>,
  dataMessages: {msg:string, from:string},
  setDataMessages: React.Dispatch<React.SetStateAction<{msg:string, from:string}>>,
  previousPath: string,
  setPreviousPath: React.Dispatch<React.SetStateAction<string>>,
  id2: string | undefined,
  setid2: React.Dispatch<React.SetStateAction<string | undefined>>,
  pendingMessages:{id:string, numberMessages:number}[],
  setPendingMessages:React.Dispatch<React.SetStateAction<{id:string, numberMessages:number}[]>>
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
  const [dataMessages, setDataMessages] = useState<{msg:string, from:string}>({msg:"", from:""});
  const [previousPath, setPreviousPath] = useState<string>("/");
  const [id2, setid2] = useState<string | undefined>();
  const [pendingMessages, setPendingMessages] = useState<{id:string, numberMessages:number}[]>([]);

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
    <countContext.Provider value={{userMessage, setUserMessage, dataMessages, setDataMessages, previousPath, setPreviousPath, id2, setid2,pendingMessages, setPendingMessages}}>{children}</countContext.Provider>
  )
}