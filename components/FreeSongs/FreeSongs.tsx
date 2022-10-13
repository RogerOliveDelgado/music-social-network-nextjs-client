import Image from "next/image";
import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import styles from "./styles.module.css";

import { Data } from "../../interfaces/tracks";

type Props = {
  tracks: Data[];
};

const songsArray = [
  {
    id: 1,
    name: "cancion 1",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 2,
    name: "cancion 2",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 3,
    name: "cancion 3",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 4,
    name: "cancion 4",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 5,
    name: "cancion 5",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 6,
    name: "cancion 6",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 7,
    name: "cancion 7",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 8,
    name: "cancion 8",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 9,
    name: "cancion 9",
    img: "https://via.placeholder.com/130x130.png",
  },
  {
    id: 10,
    name: "cancion 10",
    img: "https://via.placeholder.com/130x130.png",
  },
];

const FreeSongs = ({ tracks }: Props) => {
  return (
    <div className={styles.carousel__songs}>
      {tracks.map(
        (track, index) =>
          index < 10 && (
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
          )
      )}
    </div>
  );
};

export default FreeSongs;
