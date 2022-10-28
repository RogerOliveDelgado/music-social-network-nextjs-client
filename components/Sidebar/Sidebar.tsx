import React, { useEffect } from "react";
import { ButtonProps } from "./Button";
import styles from "./styles.module.css";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UploadIcon from "@mui/icons-material/Upload";
import { useI18N } from "../../context/i18";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

const drawerWidth = "15rem";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Sidebar(props: ButtonProps) {
  const BASE_URL_SPOTIFY = process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND;
  const [open, setOpen] = React.useState(false);
  const [openSongModal, setOpenSongModal] = React.useState(false);

  const [songName, setSongName] = React.useState<string>(String || undefined);
  const [songFile, setSongFile] = React.useState<File | null>({} as File);

  const [metaDataSongFile, setMetaDataSongFile] = React.useState<string>();

  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);

  const token = cookies.userToken;

  const router = useRouter();

  const { t } = useI18N();

  const uploadSongModal = (text: string) => {
    if (text === t("home").upload) {
      setOpenSongModal(true);
    }
  };

  const handleNavigation = (path: string) => {
    if (path !== "undefined") {
      router.push(path);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Open modal upload song shit

  const handleClose = () => {
    setOpenSongModal(false);
  };

  const getSongName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongName(e.target.value);
  };

  const getSongFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongFile(e.target.files![0]);
  };

  const fetchingData = async () => {
    if (metaDataSongFile !== undefined) {
      const response = await fetch(`${BASE_URL_SPOTIFY}/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: songName,
          trackAudio: metaDataSongFile || "",
        }),
      });

      const data = await response.json();
      // console.log(data);
      return data;
    }
  };

  useEffect(() => {
    fetchingData().then((data) => {
      if (data?.ok) {
        toast.success("File upload successfully");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaDataSongFile]);

  const uploadSong = async () => {
    // if (songName.length !== 0 && songFile!.length !== 0) {

    if (songName.length !== 0 && songFile!.size > 0) {
      // console.log("entro");

      if (songFile!.size < 10485760) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Use a regex to remove data url part
          const base64String = reader?.result
            ?.replace("data:", "")
            .replace(/^.+,/, "");
          setMetaDataSongFile(base64String);
          // Logs wL2dvYWwgbW9yZ...
        };

        reader.readAsDataURL(songFile);
        // console.log(songFile);
        // console.log(setMetaDataSongFile);
        handleClose();

        // setSongName("");
        setSongFile({} as File);
        // toast.success("File upload successfully");
      } else {
        toast.error("File size is too big. Maximum size is 10MB");
        return;
      }
    } else {
      toast.error("Song name and song file cannot be empty");
    }
  };

  //Function that open upload song modal
  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  return (
    <>
      <div className={styles.sidebar}>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            height: "100%",
          }}
        >
          <List>
            {[
              { text: `${t("home").home}`, url: "/" },
              { text: `${t("home").library}`, url: "/library" },
              { text: `${t("home").playlist}`, url: "/playlist" },
              { text: `${t("home").liked}`, url: "/favorites" },
              { text: `${t("home").upload}` },
            ].map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                onClick={() => {
                  handleNavigation(`${item.url}`);
                  uploadSongModal(item.text);
                }}
                sx={{
                  display: "block",
                  fontWeight: 400,
                  lineHeight: "21px",
                  color: "white",
                  backgroundColor: "inherit",
                  width: "100%",
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <LibraryMusicIcon />}
                    {index === 2 && <AddBoxIcon />}
                    {index === 3 && <FavoriteIcon />}
                    {index === 4 && <UploadIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <IconButton
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          sx={{
            padding: 0,
            position: "absolute",
            top: "50%",
            left: open ? "13.4rem" : "2.5rem",
            transform: "translateY(-50%)",
            transition: "left 225ms ease-in-out",
            zIndex: 150,
          }}
        >
          {open ? (
            <ChevronLeftIcon
              sx={{
                color: "white",
                borderRadius: "50%",
                padding: "0.5rem",
                backgroundColor: "var(--black)",
                " &:hover": {
                  backgroundColor: "var(--grey)",
                  border: "1px solid var(--lightGrey)",
                },
              }}
            />
          ) : (
            <ChevronRightIcon
              sx={{
                color: "white",
                borderRadius: "50%",
                padding: "0.5rem",
                backgroundColor: "var(--black)",
                " &:hover": {
                  backgroundColor: "var(--grey)",
                  border: "1px solid var(--lightGrey)",
                },
              }}
            />
          )}
        </IconButton>

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openSongModal}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Upload your song
          </BootstrapDialogTitle>
          <DialogContent>
            <form className={styles.sectionUploadSong}>
              <TextField
                id="name"
                margin="dense"
                label="Song name"
                type="email"
                onChange={getSongName}
                fullWidth
                variant="standard"
              />
              <div className={styles.songUploadDiv}>
                <div>
                  <span>Upload .mp3 file: </span>
                  <span style={{ color: "blue" }}>{songFile?.name}</span>
                </div>
                <div>
                  <input
                    accept="audio/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    onChange={getSongFile}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      className={styles.uploadbuttonContainer}
                    >
                      <AddIcon />
                      Upload
                    </Button>
                  </label>
                </div>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={uploadSong}>Upload song</Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <Toaster />
    </>
  );
}

export default Sidebar;
