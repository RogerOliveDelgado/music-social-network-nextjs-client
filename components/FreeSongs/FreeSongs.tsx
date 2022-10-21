import Image from "next/image";
import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import styles from "./styles.module.css";

import { Track } from "../../interfaces/tracks";

type Props = {
  tracks: Track[];
};

const FreeSongs = ({ tracks }: Props) => {
  return (
    <div className={styles.carousel__songs}>
      {tracks.map((track) => (
        <div key={track._id} className={styles.songDiv}>
          <div className={styles.imgSongDiv}>
            <Image
              src={track.album.image}
              alt={track.title}
              width={125}
              height={125}
            />
          </div>
          <span className={styles.songName}>{track.title}</span>
          <button className={styles.playButton}>
            <PlayCircleIcon sx={{ fontSize: "2rem" }} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FreeSongs;
