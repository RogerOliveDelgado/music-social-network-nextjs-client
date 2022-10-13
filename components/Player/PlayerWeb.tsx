import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import "react-h5-audio-player/lib/styles.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  TracksList,
  Track,
} from "../../redux/features/player/musicPlayerSlice";
import Song from "./Song/Song";
import styles from "./styles.module.css";

const PlayerWeb = () => {
  const AudioPlayer = dynamic(() => import("react-h5-audio-player"), {
    ssr: false,
  });

  const router = useRouter();
  const isLargeScreen = useMediaQuery({
    query: "(min-width: 790px)",
  });

  const [currentTrack, setTrackIndex] = useState(0);
  const tracks = useSelector((state: TracksList) => state.tracks);

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < tracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < tracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  return (
    <>
      {router.pathname !== "/signup" ? (
        <div className={styles.container}>
          <Song />
          {isLargeScreen && (
            <AudioPlayer
              src={tracks[currentTrack]?.src}
              showSkipControls
              onClickNext={handleClickNext}
              onEnded={handleEnd}
            />
          )}
          {!isLargeScreen && (
            <AudioPlayer
              src={tracks[currentTrack]?.src}
              onClickNext={handleClickNext}
              onEnded={handleEnd}
              showSkipControls={false}
              showJumpControls={false}
              showDownloadProgress={false}
              showFilledProgress={false}
              showFilledVolume={false}
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default PlayerWeb;

// https://www.npmjs.com/package/react-h5-audio-player
