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



function Song() {
  const id = "63566ec7f9d5803a4019ed57";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjY4NDk0MSwiZXhwIjoxNjY3MTE2OTQxfQ.pWj9iehT_syyoNjAzOpZ4oSN3opBC11UYG-0Ptreaqk";

  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  const { artistName } = useSelector((state: RootState) => state.currentTrack);

  const album = useSelector(
    (state: RootState) => state.currentTrack.currentTrack?.album
  );


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
  const [userLikedSongs, setUserLikedSongs] = useState<Track[]>([]);

  useEffect(() => {
    //Get the users likedSongs array
    //Save the founed array in the likedSongs state
    const getUser = async () => {
      const response = await fetch(`http://localhost:4001/user/${id}`, {
        headers: {
          Authorization: `bearer ${TOKEN}`,
        },
      });
      const user = await response.json();
      let array: string[] = [];
      user.data?.likedSongs.map((song: any) => {
        array.push(song);
      });
      setUserLikedSongs(array);
      // setOrderTracks(array);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSong = (song: Track) => {
    const putSongInUser = async (song: Track) => {
      const response = await fetch(`http://localhost:4002/track/library`, {
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
          const userResponse = await fetch(`http://localhost:4001/user/${id}`, {
            headers: {
              Authorization: `bearer ${TOKEN}`,
            },
          });
          const user = await userResponse.json();

          let arrayFavouritesSongs: Track[] = [];
          user.data.likedSongs.map((song: any) => {
            arrayFavouritesSongs.push(song);
          });
          // setOrderTracks(arrayFavouritesSongs);
          setUserLikedSongs(arrayFavouritesSongs);
        }, 500);
      }
    };
    putSongInUser(song);
  };

  //Add track to playlist
  const {
    data: playlists,
    isLoading: isLoadingPlaylist,
    error: playlistError,
  } = useGetPlaylistQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const userPlaylists = playlists?.data?.playlists;

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

  const addTrackToPlaylist = async (
    playlistId: string | string[] | undefined,
    track: Track
  ) => {
    try {
      const response = await fetch(
        `http://localhost:4002/playlist/tracks/${playlistId}`,
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
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.image_container}>
        <Image
          src={
            albumImage !== undefined
              ? albumImage
              : "/images/default_playlist.png"
          }
          alt="Picture of the author"
          width="52px"
          height="52px"
        />
      </div>
      <div id="container_song" className={styles.song_container}>
        <span id="title_song">{currentTrack.title}</span>
        <span id="artist_song">{artistName}</span>
      </div>
      <div className={styles.icons}>
        {userLikedSongs?.some((element) => element._id === currentTrack._id) ? (
          <Tooltip title="Add to favorites">
            <FavoriteIcon
              onClick={() => {
                addSong(currentTrack);
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Add to favorites">
            <FavoriteBorderIcon
              onClick={() => {
                addSong(currentTrack);
              }}
            />
          </Tooltip>
        )}
        <Tooltip title="Add track to playlist">
          <Button
            color="inherit"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => handleClick(e, currentTrack)}
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
              backgroundColor: "var(--grey)",
              color: "white",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              border: "1px solid var(--darker_black)",
            },
          }}
        >
          <p
            className={styles.menu_title}
          >{`Select a playlist to add track '${trackTitle.title}':`}</p>
          {userPlaylists?.map((playlist: any) => (
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
          ))}
        </Menu>
      </div>
      <Toaster />
    </div>
  );
}

export default Song;
