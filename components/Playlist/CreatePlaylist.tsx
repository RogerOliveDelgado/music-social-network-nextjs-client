import React, { useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./styles.module.css";
import { TextareaAutosize } from "@mui/base";
import { style } from "@mui/system";

function CreatePlaylist() {
  const [hover, setHover] = useState(false);
  const [modalHover, setModalHover] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [name, setName] = useState("My playlist");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = () => {
    setOpen(false);
    setName(playlistName);
    setDescription(playlistDescription);
  };

  console.log(playlistName);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image_container}>
          {image !== null && image !== undefined ? (
            <img
              className={styles.image_container}
              src={URL.createObjectURL(new Blob([image]))}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
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
          <span className={styles.playlist_name}>{name}</span>
          <span>{description}</span>
          <span>User name</span>
        </div>
      </div>
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
              {image !== null && image !== undefined ? (
                <img
                  className={styles.modal_image_container}
                  src={URL.createObjectURL(new Blob([image]))}
                />
              ) : (
                <>
                  <EditIcon className={styles.edit_icon} />
                  <span>Select an image</span>
                </>
              )}
              <label htmlFor="image" className={styles.input_label}>
                {modalHover && image !== null && image !== undefined ? (
                  <EditIcon className={styles.edit_icon} />
                ) : null}
              </label>
              <input
                id="image"
                className={styles.input}
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className={styles.modal_data}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Playlist name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Add an optional description"
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
            <Button onClick={() => handleSaveChanges()}>Save Changes</Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export default CreatePlaylist;
