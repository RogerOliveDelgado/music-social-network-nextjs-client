import React, { useState } from 'react';
import SignUpFailed from '../../components/SignUpInputs/SignUpFailed';

import styles from './styles.module.css';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MusicGenre from '../MusicGenre/MusicGenre';
import { useI18N } from '../../context/i18';

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
  failedMsg: string;
  setCookie: Function;
  setSignUpFailed: Function;
  setFailedMsg: Function;
};

const musicGenre = [
  { genreName: 'Latin Hip Hop', cover: '/Genres/latin_hip_hop.jpeg' },
  { genreName: 'Reggaeton', cover: '/Genres/reggeton.jpeg' },
  { genreName: 'Trap Latino', cover: '/Genres/trap_latino.jpeg' },
  { genreName: 'Rap', cover: '/Genres/rap.jpeg' },
  { genreName: 'Latin Rock', cover: '/Genres/latin_rock.jpeg' },
  { genreName: 'Urbano Espanol', cover: '/Genres/urbano_espanol.jpeg' },
  { genreName: 'R&B Argentino', cover: '/Genres/rb_argentino.webp' },
  { genreName: 'Pop', cover: '/Genres/pop.jpeg' },
  { genreName: 'Rap Español', cover: '/Genres/rap_espanol.jpeg' },
  { genreName: 'Latin Pop', cover: '/Genres/latin_pop.webp' },
  { genreName: 'Pop Soul', cover: '/Genres/pop_soul.jpeg' },
  { genreName: 'Spanish Pop Rock', cover: '/Genres/spanish_pop_rock.jpeg' },
  { genreName: 'Rock', cover: '/Genres/rock.jpeg' },
  { genreName: 'Classic Rock', cover: '/Genres/classic_rock.jpeg' },
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
  failedMsg,
  setCookie,
  setSignUpFailed,
  setFailedMsg,
}: Props) => {
  const [likedMusic, setLikedMusic] = useState<string[]>([]);
  const { t } = useI18N();
  const getLikedMusic = (genre: string) => {
    const exist = likedMusic.find((newGenre) => newGenre === genre);
    if (exist) {
      setLikedMusic((prevGenre) => prevGenre.filter((item) => item !== genre));
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
          <h2 className={styles.title}>{`${t('content').signup}`}</h2>
          <div className={styles.genresDiv}>
            {musicGenre.map((genre) => {
              return (
                <MusicGenre
                  key={genre.genreName}
                  genre={genre.genreName}
                  image={genre.cover}
                  selected={likedMusic.find(
                    (newGenre) => newGenre === genre.genreName
                  )}
                  selectGenre={getLikedMusic}
                />
              );
            })}
          </div>
          <div className={styles.divButtons}>
            <button
              onClick={clearLikedMusicArray}
              className={styles.restartGenreButton}
            >
              <ClearIcon sx={{ color: 'red' }} /> Clear
            </button>
            <button
              className={styles.submitFormButton}
              onClick={(e) => {
                signUp(username, email, password, likedMusic, e);
              }}
            >
              <AudiotrackIcon sx={{ color: 'white' }} /> Confirm
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
          likedMusic={likedMusic}
          failedMsg={failedMsg}
          setCookie={setCookie}
          setSignUpFailed={setSignUpFailed}
          setFailedMsg={setFailedMsg}
        />
      )}
    </>
  );
};

export default MusicPreferences;
