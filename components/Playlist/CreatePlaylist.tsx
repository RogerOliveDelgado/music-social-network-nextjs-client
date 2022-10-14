import React, { useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./styles.module.css";

function CreatePlaylist() {
  const [hover, setHover] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image_container}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className={styles.image_container}
              onMouseEnter={() => setHover(true)}
            />
            
          ) : (
            <div>
              <label
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                htmlFor="image"
                className={styles.input_label}
              >
                {hover ? (
                  <div className={styles.input_label}>
                    Add Image
                    <AddPhotoAlternateIcon />
                  </div>
                ) : (
                  <MusicNoteIcon />
                )}
              </label>
              <input
                id="image"
                className={styles.input}
                type="file"
                accept="image/png, image/jpeg"
                value={image}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreatePlaylist;
