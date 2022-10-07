import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src="/images/spotify_logo.png"
        alt="Spotify Logo"
        width={100}
        height={30}
        objectFit="contain"
      />
    </div>
  );
}

export default Logo;
