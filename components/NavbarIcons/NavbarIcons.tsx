import React, { useState } from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styles from './styles.module.css';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

function NavbarIcons() {
  const [cookies, setCookie, removeCookie] = useCookies(['username']);

  const [username, setUsername] = React.useState<string>();

  React.useEffect(() => {
    setUsername(cookies.username);
  }, [cookies.username]);

  // console.log(cookies.username);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
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
          cursor: 'pointer',
        }}
        onClick={() => router.push('/chat')}
      />
      <LanguageSelector />
      <div className={styles.separator}></div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {username}
        <AccountCircleIcon
          sx={{
            fontSize: 30,
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href={'/config'}>
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link href={'/login'}>
          <MenuItem>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default NavbarIcons;
