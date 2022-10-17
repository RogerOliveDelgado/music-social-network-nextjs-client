import React, { useState } from "react";
import SignUpFailed from "../../components/SignUpInputs/SignUpFailed";

import styles from "./styles.module.css";

import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  signUpCompleted: boolean;
  signUpFailed: boolean;
  signUp: Function;
  getUserName: Function;
  getEmail: Function;
  getPassword: Function;
  username: string;
  email: string;
  password: string;
};

const musicGenre = [
  "latin hip hop",
  "reggaeton",
  "trap latino",
  "rap",
  "latin rock",
  "urbano espanol",
  "r&b argentino",
  "pop",
  "rap espanol",
  "latin pop",
  "pop soul",
  "spanish pop rock",
  "rock",
  "classic rock",
];

const MusicPreferences = ({
  getUserName,
  getEmail,
  getPassword,
  signUpCompleted,
  signUpFailed,
  signUp,
  username,
  email,
  password,
}: Props) => {
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
      {signUpCompleted === true && signUpFailed === false ? (
        <div className={styles.divGenre}>
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
            <button
              className={styles.submitFormButton}
              onClick={(e) => {
                signUp(username, email, password, likedMusic, e);
              }}
            >
              <CheckIcon sx={{ color: "green" }} /> Confirm
            </button>
          </div>
        </div>
      ) : (
        <SignUpFailed
          getUserName={getUserName}
          getEmail={getEmail}
          getPassword={getPassword}
          signUpFailed={signUpFailed}
          username={username}
          email={email}
          password={password}
        />
      )}
    </>
  );
};

export default MusicPreferences;
