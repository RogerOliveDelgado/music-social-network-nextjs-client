import React, { useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import Badge from "@mui/material/Badge";
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
import { disconnectUserFromChat } from "../../socket/servicesSocket/services";
import { useMediaQuery } from "react-responsive";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  userMessage: number;
};

function NavbarIcons({ userMessage }: Props) {
  const isLargeScreen = useMediaQuery({
    query: "(min-width: 700px)",
  });

  const { t } = useI18N();

  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "userToken",
    "userID",
  ]);

  const [username, setUsername] = React.useState<string>();

  React.useEffect(() => {
    setUsername(cookies.username);
  }, [cookies.username]);

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
    <>
      <div className={styles.icons}>
        <div className={styles.notification}>
          <Badge badgeContent={userMessage} color="primary">
            <TelegramIcon
              sx={{
                fontSize: 30,
                cursor: "pointer",
              }}
              onClick={() => router.push("/chat")}
            />
          </Badge>
        </div>
        {/* <Link href={"/config"}>
          <AccountCircleIcon
            sx={{
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        </Link> */}
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {/* {isLargeScreen && username} */}
          <AccountCircleIcon
            sx={{
              fontSize: 30,
              color: "white",
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
          sx={{
            "& .MuiPopover-paper": {
              // borderRadius: 0,
              border: "1px solid #ccc",
              backgroundColor: "var(--lightGrey)",
              width: "11.3rem",
            },
          }}
        >
          <Link href={"/config"}>
            <button className={styles.profileButtons}>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  color: "white",
                  marginLeft: "-13px",
                }}
              >
                {t("content").profile}
              </MenuItem>
              <SettingsIcon />
            </button>
          </Link>
          <Link href={"/login"}>
            <button
              onClick={() => {
                removeStoragedCookie();
                disconnectUserFromChat();
              }}
              className={styles.profileButtons}
            >
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  color: "white",
                  marginLeft: "-13px",
                }}
              >
                {t("content").logout}
              </MenuItem>
              <LogoutIcon />
            </button>
          </Link>
        </Menu>
        <LanguageSelector />
      </div>
    </>
  );
}

export default NavbarIcons;
