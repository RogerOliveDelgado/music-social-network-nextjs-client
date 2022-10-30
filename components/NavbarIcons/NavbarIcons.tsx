import React, { useContext, useEffect, useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import styles from "./styles.module.css";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useI18N } from "../../context/i18";
import { border } from "@mui/system";
import { Props } from "next/script";
import { countContext } from "../../context/countContext";
import { socketContext } from "../../context/socketContext";
import { disconnectUserFromChat } from "../../socket/servicesSocket/services";

type Props = {
};

let socketId;
//Array wich contains the connected users, each time a user make login into chat app, this array will be updated
let usuarios:{id:string, socketId:string, usuario: string}[] = [];

function NavbarIcons(props:Props) {
  const { t } = useI18N();
  const {currentRoom,userMessage, setPreviousPath, setUserMessage, setDataMessages, id2, pendingMessages,setPendingMessages,previousPath} = useContext(countContext)
  const {socket,setConnectedUsers} = useContext(socketContext)
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "userToken",
    "userID",
  ]);

  useEffect(()=>{
    console.log("Entrando")
    socket.emit('update_list', { id: `${cookies.userID}`, usuario: cookies.username, action: 'login' });
    socket.on('session_update', function(data, socket){
      socketId = socket;
      usuarios = data;
      
      // Lista de usuarios conectados
      console.log(usuarios)
      setConnectedUsers(usuarios)
    });
    socket.emit("connected", cookies.userID)
    socket.on(`${cookies.userID}`,(data:any)=>{console.log("data", data)
      console.log(window.location.pathname.split('/')[window.location.pathname.split('/').length-1])
      if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1] != 'chat'){
        // setUserMessage((prevUserMessage)=> prevUserMessage+1)
        setUserMessage((prevUserMessage)=>prevUserMessage+1)//Set up 1 the userMessages
        if(pendingMessages.length > 0){//if exists pending messages 
          pendingMessages.map(pm => {
            console.log(pm)
            if (pm.id == data.from ) pm.numberMessages += 1;
          })
          console.log(pendingMessages)
          setPendingMessages(pendingMessages);
        }else{
          setPendingMessages([...pendingMessages,{id:data.from, numberMessages:1}])
        }
      }else{//If user is in chat tab
        //comprobamos si venia de otra pagina distinta al chat
        if(data.from != id2 && id2 != undefined && data.from != cookies.userID){//If user is not talking with Id2
          setUserMessage((prevUserMessage)=>prevUserMessage+1);
          if(previousPath !="chat")setUserMessage((prevUserMessage)=>prevUserMessage-1);
          if(pendingMessages.length > 0){//if exists pending messages 
            pendingMessages.map(pm => {
              if (pm.id == data.from ) pm.numberMessages += 1;
            })
            setPendingMessages(pendingMessages);
          }else{
            setPendingMessages([...pendingMessages,{id:data.from, numberMessages:1}])
          }
        }
      }
      setDataMessages(data);
    })
    return()=>{
      socket.off(`${cookies.userID}`)
    }
  },[currentRoom,pendingMessages])

  const [username, setUsername] = React.useState<string>();

  React.useEffect(() => {
    setUsername(cookies.username);
  }, [cookies.username]);

  if(typeof window !== "undefined"){
    const path = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];
    setPreviousPath(path);
  }
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeStoragedCookie = () => {
    socket.emit("Disconnect", {id:cookies.userID})
    socket.disconnect();
    removeCookie("userToken");
    removeCookie("username");
    removeCookie("userID");
  };

  const router = useRouter();
  return (
    <div className={styles.icons}>
      <div className={styles.separator}></div>
      <CenterFocusWeakIcon
        sx={{
          fontSize: 30,
        }}
      />
      <MusicVideoIcon
        sx={{
          fontSize: 30,
        }}
      />
      <TelegramIcon
        sx={{
          fontSize: 30,
          cursor: "pointer",
        }}
        onClick={() => router.push("/chat")}
      />{userMessage}
      <LanguageSelector />
      <div className={styles.separator}></div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {username}
        <AccountCircleIcon
          sx={{
            fontSize: 30,
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link href={"/config"}>
          <MenuItem>{t("content").profile}</MenuItem>
        </Link>
        <Link href={"/login"}>
          <button
            onClick={()=>{removeStoragedCookie()}}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <MenuItem>{t("content").logout}</MenuItem>
          </button>
        </Link>
      </Menu>
    </div>
  );
}

export default NavbarIcons;
