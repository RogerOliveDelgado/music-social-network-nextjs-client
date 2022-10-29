import {socketService} from '../socket'

export const disconnectUserFromChat = (idUser:string | any) => {
 
  try{
    console.log("ENTRANDO###################")
    socketService.emit("Disconnect", {id:idUser})
    // socketService.disconnect();
    console.log(socketService.emit("Disconnect", {id:idUser}))
  }catch(error){
    console.log(error)
  }
  
}


