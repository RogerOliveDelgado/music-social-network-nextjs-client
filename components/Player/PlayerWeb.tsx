import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import "react-h5-audio-player/lib/styles.css";

import React, { useEffect, useState } from "react";

import "react-h5-audio-player/lib/styles.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  currentTrack as setCurrentTrack,
  incrementIndex,
  resetIndex,
} from "../../redux/features/player/currentTracks";
import { RootState } from "../../redux/store";

import Song from './Song/Song';
import styles from './styles.module.css';
const AudioPlayer = dynamic(() => import('react-h5-audio-player'), {
  ssr: false,
});

const PlayerWeb = () => {
  const router = useRouter();
  const isLargeScreen = useMediaQuery({
    query: "(min-width: 735px)",
  });

  const dispatch = useDispatch();
  const [currentTrack, setTrackIndex] = useState(0);
  const { tracks } = useSelector((state: RootState) => state.tracks);
  const currentIndex = useSelector(
    (state: RootState) => state.currentTrack.index
  );
  const currentTrackAudio = useSelector(
    (state: RootState) => state.currentTrack.currentTrack.trackAudio
  );

  const trackIsPlaying = tracks[0]?._id;
  const songTitle = tracks[0]?.title;

  const handleClickNext = () => {
    setTrackIndex((prevState) =>
      prevState < tracks.length - 1 ? prevState + 1 : 0
    );
    if (currentTrack < tracks.length - 1) {
      dispatch(incrementIndex());
      dispatch(setCurrentTrack(tracks[currentIndex + 1]));
    } else {
      dispatch(setCurrentTrack(tracks[0]));
      dispatch(resetIndex());
    }
  };

  const handleEnd = () => {
    setTrackIndex((prevState) =>
      prevState < tracks.length - 1 ? prevState + 1 : 0
    );
    if (currentTrack < tracks.length - 1) {
      dispatch(incrementIndex());
      dispatch(setCurrentTrack(tracks[currentIndex + 1]));
    } else {
      dispatch(setCurrentTrack(tracks[0]));
      dispatch(resetIndex());
    }
  };

  useEffect(() => {
    console.log(currentTrack);
  }, [currentTrack]);

  return (
    <>
      {router.pathname !== "/signup" ? (
        <div className={styles.container}>
          {trackIsPlaying && <Song />}
          {isLargeScreen && (
            <AudioPlayer
              layout="stacked-reverse"
              // src={tracks[currentIndex]?.trackAudio}
              src={currentTrackAudio}
              showSkipControls
              onClickNext={handleClickNext}
              onEnded={handleEnd}
              autoPlay={true}
              autoPlayAfterSrcChange={true}
              volume={0.3}
            />
          )}
          {!isLargeScreen && (
            <AudioPlayer
              layout="stacked-reverse"
              src={currentTrackAudio}
              onClickNext={handleClickNext}
              autoPlay={true}
              autoPlayAfterSrcChange={true}
              onEnded={handleEnd}
              showSkipControls={false}
              showJumpControls={false}
              showDownloadProgress={false}
              showFilledProgress={false}
              showFilledVolume={false}
              volume={0.3}
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default PlayerWeb;

// https://www.npmjs.com/package/react-h5-audio-player
