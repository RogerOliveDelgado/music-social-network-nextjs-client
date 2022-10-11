import React from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

import styles from './styles.module.css';

function NavbarIcons() {
  return (
    <div className={styles.icons}>
      <div className={styles.separator}></div>
      <CenterFocusWeakIcon
        sx={{
          fontSize: 30,
        }}
      />
      <MusicVideoIcon
        sx={{
          fontSize: 30,
        }}
      />
      <TelegramIcon
        sx={{
          fontSize: 30,
        }}
      />
      <LanguageSelector />
      <div className={styles.separator}></div>
      <AccountCircleIcon
        sx={{
          fontSize: 30,
        }}
      />
    </div>
  );
}

export default NavbarIcons;
