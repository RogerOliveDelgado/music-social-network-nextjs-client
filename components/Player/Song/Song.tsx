import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useWidth from "../../../hook/useWidth";
import { useGetPlaylistQuery } from "../../../redux/playlistsAPI";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Track } from "../../../interfaces/tracks";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useGetPlaylistDetailsQuery } from "../../../redux/playlistDetailsAPI";
import { useRouter } from "next/router";
import { useI18N } from "../../../context/i18";

function Song() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "userToken",
  ]);
  const TOKEN = cookies.userToken;
  const BASE_URL_SPOTIFY =
    process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND || "";
  const BASE_URL_USERS = process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND || "";

  const { query, pathname } = useRouter();

  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  const { artistName } = useSelector((state: RootState) => state.currentTrack);

  const album = useSelector(
    (state: RootState) => state.currentTrack.currentTrack
  );

  console.log(album)
  const albumImage = album?.image;

  const width = useWidth();

  useEffect(() => {
    const container = document.getElementById("container_song")?.offsetWidth;

    const titleSong = document.getElementById("title_song");
    const titleSongWidth = titleSong?.offsetWidth;

    const artistSong = document.getElementById("artist_song");
    const artistSongWidth = artistSong?.offsetWidth;

    if (
      container !== undefined &&
      titleSongWidth !== undefined &&
      titleSong !== null
    ) {
      if (titleSongWidth > container) {
        titleSong.classList.add(styles.rotate);
      } else {
        titleSong.classList.remove(styles.rotate);
      }
    }

    if (
      container !== undefined &&
      artistSongWidth !== undefined &&
      artistSong !== null
    ) {
      if (artistSongWidth > container) {
        artistSong.classList.add(styles.rotate);
      } else {
        artistSong.classList.remove(styles.rotate);
      }
    }
  }, [width, currentTrack]);

  //Add to favorites
  const {
    data: playlists,
    isLoading: isLoadingPlaylist,
    error: playlistError,
    refetch,
  } = useGetPlaylistQuery(
    { userID: cookies.userID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { refetch: refetchPlaylists } = useGetPlaylistDetailsQuery(
    { playlistID: query?.playlistID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const addSong = (song: Track) => {
    const putSongInUser = async (song: Track) => {
      const response = await fetch(`${BASE_URL_SPOTIFY}/track/library`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `bearer ${TOKEN}`,
        },
        body: JSON.stringify(song),
      });
      const data = await response.json();

      //Get the user information to set again the likedSongs array with changes
      if (data.ok) {
        setTimeout(async () => {
          const userResponse = await fetch(
            `${BASE_URL_USERS}/user/${cookies.userID}`,
            {
              headers: {
                Authorization: `bearer ${TOKEN}`,
              },
            }
          );
          const user = await userResponse.json();
          refetch();
          refetchPlaylists();
        }, 500);
      }
    };
    putSongInUser(song);
  };

  const userPlaylists = playlists?.data?.playlists;
  const likedSongs = playlists?.data?.likedSongs;

  //Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [trackTitle, setTrackTitle] = useState<Track>({} as Track);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    track: Track
  ) => {
    setAnchorEl(event.currentTarget);
    setTrackTitle(track);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Add track to playlist
  const addTrackToPlaylist = async (
    playlistId: string | string[] | undefined,
    track: Track
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL_SPOTIFY}/playlist/tracks/${playlistId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            tracks: track._id,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const manageClick = (playlistID: string, track: Track) => {
    try {
      addTrackToPlaylist(playlistID, track);
      toast.success("Track added to playlist successfully");
      refetch();
      refetchPlaylists();
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const { t } = useI18N();

  return (
    <div className={styles.wrapper}>
      <div className={styles.image_container}>
        <Image
          src={
            albumImage !== undefined
              ? albumImage
              : "/Images/default_playlist.png"
          }
          alt="Picture of the author"
          width="52px"
          height="52px"
        />
      </div>
      <div id="container_song" className={styles.song_container}>
        <span id="title_song">{currentTrack?.title}</span>
        <span id="artist_song">{artistName}</span>
      </div>
      <div className={styles.icons}>
        {likedSongs?.some(
          (element: Track) => element._id === currentTrack?._id
        ) ? (
          <Tooltip title={t("tooltip").addFavorites}>
            <FavoriteIcon
              onClick={() => {
                if(pathname === '/login') {
                  toast.error('You must be logged in to enjoy our app!')
                  return
                }
                addSong(currentTrack);
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title={t("tooltip").addFavorites}>
            <FavoriteBorderIcon
              onClick={() => {
                if(pathname === '/login') {
                  toast.error('You must be logged in to enjoy our app!')
                  return
                }
                addSong(currentTrack);
              }}
            />
          </Tooltip>
        )}
        <Tooltip title={t("tooltip").addTrack}>
          <Button
            color="inherit"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => {
              if(pathname === '/login') {
                toast.error('You must be logged in to enjoy our app!')
                return
              }
              handleClick(e, currentTrack)}}
          >
            <input hidden />
            <AddCircleOutlineIcon />
          </Button>
        </Tooltip>
        <Menu
          id="account-menu"
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              mt: 1.5,
            },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "left", vertical: "bottom" }}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              backgroundColor: "var(--black)",
              color: "white",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              border: "1px solid var(--darker_black)",
            },
          }}
        >
         <h4
              className={styles.menu_title}
            >{`${t('content').menuItem} '${trackTitle.title}':`}</h4>
           {userPlaylists?.length > 0 ? (
            userPlaylists?.map((playlist: any) => (
              <MenuItem
                key={playlist._id}
                onClick={() => manageClick(playlist._id, trackTitle)}
                sx={{
                  padding: "0.5rem 1rem",
                  "&:hover": {
                    backgroundColor: "var(--lightGrey)",
                  },
                }}
              >
                {playlist.title}
              </MenuItem>
            ))
          ) : (
            <MenuItem
            sx={{
              fontStyle: "italic",
              cursor: "default",
              " &:hover": {
                backgroundColor: "transparent",
              },
            }}
            >
                  {t('content').noPlaylists}
            </MenuItem>
          )}
        </Menu>
      </div>
      <Toaster />
    </div>
  );
}

export default Song;
