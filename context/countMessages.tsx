import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";

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
  const [userMessage, setUserMessage] = useState<number>(0);

  return(
    <countContext.Provider value={{userMessage, setUserMessage}}>{children}</countContext.Provider>
  )
}
