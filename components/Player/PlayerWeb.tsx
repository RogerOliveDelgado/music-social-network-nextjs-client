import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  TracksList,
  Track,
} from '../../redux/features/player/musicPlayerSlice';

const PlayerWeb = () => {
  const router = useRouter();
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
      {router.pathname !== '/signup' ? (
        <AudioPlayer
          src={tracks[currentTrack]?.src}
          showSkipControls
          onClickNext={handleClickNext}
          onEnded={handleEnd}
        />
      ) : null}
    </>
  );
};

export default PlayerWeb;

// https://www.npmjs.com/package/react-h5-audio-player
