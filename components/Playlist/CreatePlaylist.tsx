import React, { ChangeEvent, useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./styles.module.css";
import { TextareaAutosize } from "@mui/base";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

function CreatePlaylist(props: any) {
  const router = useRouter();
  const playlistId = router.query.playlistID;

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjY4NDk0MSwiZXhwIjoxNjY3MTE2OTQxfQ.pWj9iehT_syyoNjAzOpZ4oSN3opBC11UYG-0Ptreaqk";

  const [hover, setHover] = useState(false);
  const [modalHover, setModalHover] = useState(false);
  const [playlistImage, setPlaylistImage] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [title, setTitle] = useState("New playlist");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [description, setDescription] = useState("");
  const [metaDataplayListImage, setMetaDataPlayListImage] = useState<string>();
  const [open, setOpen] = React.useState(false);

  const defaultImage =
    "https://res.cloudinary.com/juancarlos/image/upload/v1666622105/soc3kvuyp97jrrxlhya6.png";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createPlaylist = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    playlistName: string,
    playlistDescription: string,
    playlistImage: File | null
  ) => {
    e.preventDefault();
    setPlaylistImage(playlistImage);
    setPlaylistName(playlistName);
    setPlaylistDescription(playlistDescription);

    try {
      metaDataplayListImage === undefined ? defaultImage : null;
      const response = await fetch("http://localhost:4002/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          title: playlistName,
          description: playlistDescription,
          image:
            metaDataplayListImage === undefined
              ? defaultImage
              : metaDataplayListImage,
        }),
      });
      if (response.status === 400) {
        const result = await response.json();
        console.log(result);
        toast.error("Oops, something went wrong");
      }

      if (response.ok) {
        const result = await response.json();
        setTitle(playlistName);
        setDescription(playlistDescription);
        setImage(playlistImage);
        setOpen(false);
        toast.success("Playlist created!");
        setTimeout(() => {
          router.push(`/playlist/${result.data._id}`);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editPlaylist = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    playlistName: string,
    playlistDescription: string,
    playlistImage: File | null
  ) => {
    e.preventDefault();
    setPlaylistImage(playlistImage);
    setPlaylistName(playlistName);
    setPlaylistDescription(playlistDescription);
    try {
      const response = await fetch(
        `http://localhost:4002/playlist/${playlistId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            title: playlistName == "" ? props.title : playlistName,
            description:
              playlistDescription == ""
                ? props.description
                : playlistDescription,
            image: playlistImage == null ? props.image : metaDataplayListImage,
          }),
        }
      );
      if (response.status === 400) {
        const result = await response.json();
        console.log(result);
        toast.error("Oops, something went wrong");
      }

      if (response.ok) {
        const result = await response.json();
        props.setImagePlayList(result.data.image);
        props.setTitle(result.data.title);
        props.setDescription(result.data.description);
        props.setChange(!props.change);
        setOpen(false);
        toast.success("Playlist information edited succesfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files[0];
    // Encode the file using the FileReader API
    if (file.size < 10485760) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Use a regex to remove data url part
        const base64String = reader?.result
          ?.replace("data:", "")
          .replace(/^.+,/, "");
        setMetaDataPlayListImage(base64String);
        // Logs wL2dvYWwgbW9yZ...
      };
      reader.readAsDataURL(file);
      setPlaylistImage(file);
    } else {
      toast.error("File size is too big. Maximum size is 10MB");
      setOpen(false);
      return;
    }
  };

  const deletePlaylist = async () => {
    Swal.fire({
      title: "Do you want to delete the playlist?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:4002/playlist/${playlistId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${TOKEN}`,
              },
            }
          );
          if (response.status === 400) {
            const result = await response.json();
            toast.error("Oops, something went wrong");
          }

          if (response.ok) {
            const result = await response.json();
            toast.success("Playlist deleted succesfully!");
            setTimeout(() => {
              router.push(`/`);
            }, 1500);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const isLargeScreen = useMediaQuery({
    query: "(min-width: 670px)",
  });

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.container_front}
          onMouseOver={!playlistId ? () => setHover(true) : undefined}
          onMouseLeave={!playlistId ? () => setHover(false) : undefined}
        >
          <div
            className={playlistId ? styles.icons_wrapper : styles.unique_icon}
          >
            <Tooltip title="Edit playlist">
              <EditIcon onClick={handleClickOpen} />
            </Tooltip>
            {playlistId && (
              <Tooltip title="Delete playlist">
                <DeleteForeverIcon onClick={() => deletePlaylist()} />
              </Tooltip>
            )}
          </div>

          <div
            className={styles.image_wrapper}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {props.playlistId ? (
              <picture>
                <img
                  className={styles.image_container}
                  src={props.image}
                  alt="playlist"
                />
              </picture>
            ) : image !== null && image !== undefined ? (
              <picture>
                <img
                  alt="playlist"
                  className={styles.image_container}
                  src={URL.createObjectURL(new Blob([image]))}
                />
              </picture>
            ) : (
              <picture>
                <img
                  alt="playlist"
                  className={styles.image_container}
                  src="/images/default_playlist.png"
                />
              </picture>
            )}
          </div>
          <div className={styles.playlist_info}>
            {props.playlistId ? (
              <span className={styles.playlist_name}>{props.title}</span>
            ) : (
              <span className={styles.playlist_name}>{title}</span>
            )}
            {props.playlistId ? (
              <span>{props.description}</span>
            ) : (
              <span>{description}</span>
            )}
          </div>
        </div>
      </div>
      <form autoComplete="off">
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
              color: "white",
            },
          }}
        >
          <div className={styles.modal}>
            <DialogTitle
              sx={{
                color: "white",
              }}
            >
              Edit Details
            </DialogTitle>
            <DialogContent
              sx={{
                display: isLargeScreen ? "flex" : "block",
              }}
            >
              <div
                className={styles.modal_image_container}
                onMouseOver={() => setModalHover(true)}
                onMouseLeave={() => setModalHover(false)}
              >
                {props.playlistId ? (
                  <picture>
                    <img
                      className={styles.modal_image_container}
                      src={
                        playlistImage == null
                          ? props.image
                          : URL.createObjectURL(new Blob([playlistImage]))
                      }
                      alt="playlist"
                    />
                  </picture>
                ) : playlistImage !== null && playlistImage !== undefined ? (
                  <picture>
                    <img
                      alt="playlist"
                      className={styles.modal_image_container}
                      src={URL.createObjectURL(new Blob([playlistImage]))}
                    />
                  </picture>
                ) : (
                  <>
                    <picture>
                      <img
                        alt="playlist"
                        className={styles.modal_image_container}
                        src="/images/default_playlist.png"
                      />
                    </picture>
                    <span>Select an image</span>
                  </>
                )}

                <label htmlFor="image" className={styles.modal_input_label}>
                  {props.playlistId && modalHover ? (
                    <EditIcon className={styles.edit_icon} />
                  ) : modalHover &&
                    playlistImage !== null &&
                    playlistImage !== undefined ? (
                    <EditIcon className={styles.edit_icon} />
                  ) : null}
                </label>
                <input
                  id="image"
                  className={styles.input}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => (!e.target.files ? null : handleImage(e))}
                  //setPlaylistImage(e.target.files[0])
                />
              </div>
              <div className={styles.modal_data}>
                <TextField
                  autoFocus
                  defaultValue={props.playlistId ? props.title : playlistName}
                  placeholder="Playlist name"
                  margin="dense"
                  id="name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
                <TextareaAutosize
                  required
                  aria-label="minimum height"
                  maxLength={100}
                  minRows={3}
                  defaultValue={
                    props.playlistId ? props.description : playlistDescription
                  }
                  placeholder="Add a description to your playlist"
                  style={{
                    width: 200,
                    height: 100,
                    backgroundColor: "var(--lightGrey)",
                    color: "white",
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
                  }}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                startIcon={<CloseIcon sx={
                  {
                    color: "red"
                  }
                } />}
                color="error"
                onClick={handleClose}
                sx={{
                  color: "white",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  props.playlistId
                    ? (e) =>
                        editPlaylist(
                          e,
                          playlistName,
                          playlistDescription,
                          playlistImage
                        )
                    : (e) =>
                        createPlaylist(
                          e,
                          playlistName,
                          playlistDescription,
                          playlistImage
                        )
                }
                variant="contained"
                endIcon={<CheckIcon />}
              >
                Save Changes
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Toaster />
      </form>
    </>
  );
}

export default CreatePlaylist;
