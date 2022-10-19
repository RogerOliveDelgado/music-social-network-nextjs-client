import React, { useState } from "react";
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
import DeleteButton from "./DeleteButton/DeleteButton";

function CreatePlaylist(props: any) {
  const router = useRouter();
  const playlistId = router.query.playlistID;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRhZjMxNDQ1MmUwZmQxNDk0M2E5OTUiLCJ1c2VybmFtZSI6InZpY3RvcjIyIiwiaWF0IjoxNjY1ODU2MzEzLCJleHAiOjE2NjYyODgzMTN9.GCiZBqp1wuWDUEhpIZVM5lhtfL6sgKxAKKJ-E11izow";

  const [hover, setHover] = useState(false);
  const [modalHover, setModalHover] = useState(false);
  const [playlistImage, setPlaylistImage] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [title, setTitle] = useState("New playlist");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = React.useState(false);

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
      const response = await fetch("http://localhost:4002/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: playlistName,
          description: playlistDescription,
          image: `/${playlistImage?.name}`,
        }),
      });
      if (response.status === 400) {
        const result = await response.json();
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
        }, 2500);
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: playlistName == "" ? props.title : playlistName,
            description:
              playlistDescription == ""
                ? props.description
                : playlistDescription,
            image:
              playlistImage == null ? props.image : `/${playlistImage?.name}`,
          }),
        }
      );
      if (response.status === 400) {
        const result = await response.json();
        toast.error("Oops, something went wrong");
      }

      if (response.ok) {
        const result = await response.json();
        setTitle(playlistName);
        setDescription(playlistDescription);
        setImage(playlistImage);
        setOpen(false);
        toast.success("Playlist information edited succesfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image_container}>
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
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              />
            </picture>
          ) : hover ? (
            <EditIcon className={styles.edit_icon} />
          ) : (
            <MusicNoteIcon />
          )}

          <span
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={styles.input_label}
            onClick={handleClickOpen}
          >
            {hover ? <EditIcon className={styles.edit_icon} /> : null}
          </span>
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

          <span>{description}</span>
        </div>
      </div>
      <form autoComplete="off">
        <Dialog open={open} onClose={handleClose}>
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
                display: "flex",
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
                      src={props.image}
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
                    <EditIcon className={styles.edit_icon} />
                    <span>Select an image</span>
                  </>
                )}

                <label htmlFor="image" className={styles.input_label}>
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
                  onChange={(e) =>
                    !e.target.files ? null : setPlaylistImage(e.target.files[0])
                  }
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
                  minRows={3}
                  defaultValue={
                    props.playlistId ? props.description : playlistDescription
                  }
                  placeholder="Add a description to your playlist"
                  style={{
                    width: 200,
                    height: 100,
                    backgroundColor: "#585c63",
                    color: "white",
                  }}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
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
              >
                Save Changes
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Toaster />
      </form>
      {playlistId && <DeleteButton />}
    </>
  );
}

export default CreatePlaylist;
