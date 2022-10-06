import React, { useState } from "react";

import styles from "../../styles/Home.module.css";

import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  signUpCompleted: boolean;
};

const musicGenre = [
  "clásica",
  "Blues",
  "Jazz",
  "Soul",
  "R&B: Rhythm and Blues ",
  "Rock and Roll",
  "rock",
  "Metal",
  "Disco",
  "Pop",
  "Reggaeton",
  "Techno",
];

const MusicPreferences = ({ signUpCompleted }: Props) => {
  const [likedMusic, setLikedMusic] = useState<string[]>([]);

  const getLikedMusic = (genre: string) => {
    const exist = likedMusic.find((newGenre) => newGenre === genre);

    if (exist) {
      setLikedMusic((prevGenre) => [...prevGenre]);
    } else {
      setLikedMusic((prevGenre) => [...prevGenre, genre]);
    }
  };

  const clearLikedMusicArray = () => {
    setLikedMusic([]);
  };

  return (
    <>
      {signUpCompleted === true && (
        <>
          <div className={styles.genresDiv}>
            {musicGenre.map((genre) => {
              return (
                <div
                  key={genre}
                  onClick={() => {
                    getLikedMusic(genre);
                  }}
                  className={styles.genreDiv}
                >
                  <p
                    className={
                      likedMusic.find((newGenre) => newGenre === genre)
                        ? `${styles.selected} ${styles.genreName}`
                        : `${styles.no_selected} ${styles.genreName}`
                    }
                  >
                    {genre}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.divButtons}>
            <button
              onClick={clearLikedMusicArray}
              className={styles.restartGenreButton}
            >
              <ClearIcon sx={{ color: "red" }} /> Clear
            </button>
            <button className={styles.submitFormButton}>
              <CheckIcon sx={{ color: "green" }} /> Confirm
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MusicPreferences;
