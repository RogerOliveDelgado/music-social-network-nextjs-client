import { useCookies } from 'react-cookie';
import {socketService} from '../socket'

// const id1 = "6359478dcc3b4a9e3d470f67"

export const disconnectUserFromChat = (userId:string) => {
  
  try{
    console.log("ENTRANDO###################")
    // socketService.emit("Disconnect", {id:userId})
    // socketService.disconnect();
    // console.log(socketService.emit("Disconnect", {id:id1}))
  }catch(error){
    console.log(error)
  }
  
}
