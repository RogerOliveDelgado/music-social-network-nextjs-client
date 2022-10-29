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
import {disconnectUserFromChat} from '../../socket/servicesSocket/services'
import { Props } from "next/script";
import { countContext } from "../../context/countContext";
import { socketContext } from "../../context/socketContext";

type Props = {
};

function NavbarIcons(props:Props) {
  const { t } = useI18N();
  const {currentRoom,userMessage, setPreviousPath, setUserMessage, setDataMessages, id2, pendingMessages} = useContext(countContext)
  const {socket} = useContext(socketContext)
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "userToken",
    "userID",
  ]);

  useEffect(()=>{
    socket.on(`${cookies.userID}`,(data:any)=>{
      if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1] != 'chat'){
        setUserMessage(userMessage+1);
      }
      // else{
      //   console.log(data)
      //   console.log(currentRoom)
      //   if(data.msg.split(':')[0] != currentRoom){//Si nos llega un mensaje de una room distinta suma 1
      //     console.log("Deberia entrar")
      //     setUserMessage(userMessage+1);
      //   }
      // }
      setDataMessages(data);
    })
    return()=>{
      socket.off(`${cookies.userID}`)
    }
  },[currentRoom])

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
        onClick={disconnectUserFromChat}
      />
      <MusicVideoIcon
        sx={{
          fontSize: 30,
        }}
        onClick={disconnectUserFromChat}
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
            onClick={()=>{removeStoragedCookie(); disconnectUserFromChat()}}
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
