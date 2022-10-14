import React, { useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./styles.module.css";

function CreatePlaylist() {
  const [hover, setHover] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [playlistName, setPlaylistName] = useState("My playlist");

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
          <label
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            htmlFor="image"
            className={styles.input_label}
          >
            {hover ? <EditIcon className={styles.edit_icon} /> : null}
          </label>
          <input
            id="image"
            className={styles.input}
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className={styles.playlist_info}>
          <span>{playlistName}</span>
          <span>Username</span>
        </div>
      </div>
    </>
  );
}

export default CreatePlaylist;
