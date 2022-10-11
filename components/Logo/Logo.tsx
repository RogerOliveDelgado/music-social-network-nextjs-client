import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

import { LogoProps } from '../../interfaces/interfaces';

function Logo({ Height, Width, ClassName }: LogoProps) {
  return (
    <div className={`${ClassName}`}>
      <Image
        src="/images/spotify_logo.png"
        alt="Spotify Logo"
        width={Width}
        height={Height}
        objectFit="contain"
      />
    </div>
  );
}

export default Logo;
