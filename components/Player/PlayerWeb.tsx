import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useRouter } from "next/router";

const PlayerWeb = () => {
  const router = useRouter();
  const [currentTrack, setTrackIndex] = useState(0);

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleEnd = () => {
    console.log("end");
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };
  const playlist = [
    { src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3" },
    { src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3" },
    { src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3" },
  ];
  return (
    <>
      {router.pathname !== "/signup" ? (
        <AudioPlayer
          src={playlist[currentTrack].src}
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
