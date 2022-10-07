import React from "react";
import styles from "./styles.module.css";
import PlayerWeb from "./PlayerWeb";

function Player() {
  return (
    <>
      <div className={styles.player}>
        <PlayerWeb />
      </div>
    </>
  );
}

export default Player;
