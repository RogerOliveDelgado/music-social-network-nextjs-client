import * as React from "react";

import TelegramIcon from "@mui/icons-material/Telegram";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import styles from "./styles.module.css";
import Link from "next/link";

function NavbarIcons() {
  const openUserMenu = () => {};

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        }}
      />
      <LanguageSelector />
      <div className={styles.separator}></div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
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
        <Link href={"/profile"}>
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link href={"/login"}>
          <MenuItem>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default NavbarIcons;
