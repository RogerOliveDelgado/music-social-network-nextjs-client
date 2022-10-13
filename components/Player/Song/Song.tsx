import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import styles from "./styles.module.css";

function Song() {
  
  if (typeof window !== "undefined") {
    const titleSong = document.getElementById("title_song");
    const titleSongWidth = titleSong?.offsetWidth;
    const artistSong = document.getElementById("artist_song");
    const artistSongWidth = artistSong?.offsetWidth;

    if (titleSongWidth !== undefined && titleSong?.scrollWidth !== undefined) {
      if (titleSongWidth < titleSong?.scrollWidth) {
        titleSong.classList.add(styles.rotate);
      }
    }

    if (
      artistSongWidth !== undefined &&
      artistSong?.scrollWidth !== undefined
    ) {
      if (artistSongWidth < artistSong?.scrollWidth) {
        artistSong.classList.add(styles.rotate);
      }
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
        <span id="title_song">Title long example title long example title long example</span>
        <span id="artist_song">Artist</span>
      </div>
      <div className={styles.icons}>
        <FavoriteIcon />
        <AddCircleIcon />
      </div>
    </div>
  );
}

export default Song;
