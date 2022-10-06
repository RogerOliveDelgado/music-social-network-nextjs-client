import React from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import navbarStyles from "../../styles/navbar/Navbar.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Props = {};

function Navbar({}: Props) {
  return (
    <>
      <div className={navbarStyles.navbar}>
        <span className={navbarStyles.span}>|</span>
        <CenterFocusWeakIcon fontSize="inherit" />
        <MusicVideoIcon fontSize="inherit" />
        <TelegramIcon fontSize="inherit" />
        <span className={navbarStyles.span}>|</span>
        <AccountCircleIcon fontSize="inherit" />
      </div>
    </>
  );
}

export default Navbar;
