import React from "react";
import Image from "next/image";
import playerStyles from "../../styles/player/Player.module.css";
import PlayerWeb from "./PlayerWeb";



function Player() {
  return (
    <>
      <div className={playerStyles.player}>
        <PlayerWeb />
      </div>
    </>
  );
}

export default Player;
