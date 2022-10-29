import {Socket, io} from 'socket.io-client'

//Initialize the socket 
export const socketService: Socket = io(`https://chat-backend-turbofieras.herokuapp.com`,{transports: ['websocket']});