import { Button } from "@mui/material";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Tooltip from "@mui/material/Tooltip";
import SkelettonButton from "../../components/SkelettonButton/SkelettonButton";

import styles from "./styles.module.css";
import { useI18N } from "../../context/i18";

const AlbumHeaderSkeletton = () => {
  const { t } = useI18N();

  return (
    <>
      <picture>
        <img
          className={styles.album_image}
          src=""
          alt=""
          width={200}
          height={200}
        />
      </picture>
      <div className={styles.album_details_text}>
        <p className={styles.albums_ratings}>
          Album <Rating name="simple-controlled" value={0} />
        </p>
        <h1 className={styles.album_name}></h1>
        <h2 className={styles.album_artist}>
          <InterpreterModeIcon />
        </h2>
        <SkelettonButton />
      </div>
      <div className={styles.play_button_container}>
        <Button
          className={styles.play_button}
          variant="contained"
          color="inherit"
          startIcon={<PlayArrowIcon />}
        >
          Play
        </Button>
      </div>
    </>
  );
};

export default AlbumHeaderSkeletton;
