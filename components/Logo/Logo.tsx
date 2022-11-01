import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

import { LogoProps } from "../../interfaces/interfaces";
import { useMediaQuery } from "react-responsive";

function Logo({ Height, Width, ClassName }: LogoProps) {
  return (
    <div className={`${ClassName}`}>
      <picture className={styles.large_screen}>
        <img src="/Images/beatgo_logo.png" alt="BeatGo Logo" />
      </picture>
      <picture className={styles.mobile_screen}>
        <img src="/Images/logo.png" alt="BeatGo Logo" />
      </picture>
    </div>
  );
}

export default Logo;
