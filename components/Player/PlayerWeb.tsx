import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import "react-h5-audio-player/lib/styles.css";
import { TracksList } from "../../redux/features/player/musicPlayerSlice";

import React, { createRef, useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { currentTrack as setCurrentTrack } from "../../redux/features/player/currentTracks";
import { RootState } from "../../redux/store";

import Song from "./Song/Song";
import styles from "./styles.module.css";

const PlayerWeb = () => {
  const AudioPlayer = dynamic(() => import("react-h5-audio-player"), {
    ssr: false,
  });

  const router = useRouter();
  const isLargeScreen = useMediaQuery({
    query: "(min-width: 735px)",
  });

  const dispatch = useDispatch();
  const [currentTrack, setTrackIndex] = useState(0);
  const { tracks } = useSelector((state: RootState) => state.tracks);
  const currentTrackStore = useSelector(
    (state: RootState) => state.currentTrack
  );

  useEffect(() => {
    dispatch(setCurrentTrack(tracks[currentTrack]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  const handleClickNext = () => {
    setTrackIndex((prevState) =>
      prevState < tracks.length - 1 ? prevState + 1 : 0
    );
    if (currentTrack < tracks.length - 1) {
      dispatch(setCurrentTrack(tracks[currentTrack + 1]));
    } else {
      dispatch(setCurrentTrack(tracks[0]));
    }
  };

  const handleEnd = () => {
    setTrackIndex((prevState) =>
      prevState < tracks.length - 1 ? prevState + 1 : 0
    );
    if (currentTrack < tracks.length - 1) {
      dispatch(setCurrentTrack(tracks[currentTrack + 1]));
    } else {
      dispatch(setCurrentTrack(tracks[0]));
    }
  };

  return (
    <>
      {router.pathname !== "/signup" ? (
        <div className={styles.container}>
          <Song />
          {isLargeScreen && (
            <AudioPlayer
              layout="stacked-reverse"
              src={tracks[currentTrack]?.trackAudio}
              showSkipControls
              onClickNext={handleClickNext}
              onEnded={handleEnd}
            />
          )}
          {!isLargeScreen && (
            <AudioPlayer
              layout="stacked-reverse"
              src={tracks[currentTrack]?.trackAudio}
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
