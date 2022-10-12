import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import styles from "./styles.module.css";

function Song() {
  if (typeof window !== "undefined") {
    const titleSong = document.getElementById("title_song");
    const titleSongLength = titleSong?.textContent?.length;
    const artistSong = document.getElementById("artist_song");
    const artistSongLength = artistSong?.textContent?.length;

    if (titleSongLength !== undefined && titleSongLength > 30) {
      titleSong?.classList.add(`${styles.rotate}`);
    }

    if (artistSongLength !== undefined && artistSongLength > 30) {
      artistSong?.classList.add(`${styles.rotate}`);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.image_container}>
        <Image
          src="https://i.scdn.co/image/ab67616d00004851f4483d4440a89a2cab3b5141"
          alt="Picture of the author"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.song_container}>
        <span id="title_song">
          Title long song example title long song example{" "}
        </span>
        <span id="artist_song">Artist </span>
      </div>
      <div className={styles.icons}>
        <FavoriteIcon />
        <AddCircleIcon />
      </div>
    </div>
  );
}

export default Song;
