import React, { useEffect } from 'react';
import Image from 'next/image';
import { ButtonProps } from './Button';
import styles from './styles.module.css';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/router';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useI18N } from '../../context/i18';

const drawerWidth = '15rem';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function Sidebar(props: ButtonProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const { t } = useI18N();

  console.log(t('home').home);

  const handleNavigation = (path: string) => {
    if (path !== 'undefined') {
      router.push(path);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <List>
          {[
            { text: `${t('home').home}`, url: '/home' },
            { text: `${t('home').library}`, url: '/library' },
            { text: `${t('home').playlist}` },
            { text: `${t('home').liked}`, url: '/favorites' },
          ].map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              onClick={() => handleNavigation(`${item.url}`)}
              sx={{
                display: 'block',
                fontWeight: 400,
                lineHeight: '21px',
                color: 'white',
                backgroundColor: 'inherit',
                width: '100%',
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <LibraryMusicIcon />}
                  {index === 2 && <AddBoxIcon />}
                  {index === 3 && <FavoriteIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <IconButton
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        sx={{
          padding: 0,
          position: 'absolute',
          top: '50%',
          left: open ? '13.4rem' : '2.5rem',
          transform: 'translateY(-50%)',
          transition: 'left 225ms ease-in-out',
          zIndex: 1,
        }}
      >
        {open ? (
          <ChevronLeftIcon
            sx={{
              color: 'white',
              borderRadius: '50%',
              padding: '0.5rem',
              backgroundColor: 'var(--black)',
              ' &:hover': {
                backgroundColor: 'var(--grey)',
                border: '1px solid var(--lightGrey)',
              },
            }}
          />
        ) : (
          <ChevronRightIcon
            sx={{
              color: 'white',
              borderRadius: '50%',
              padding: '0.5rem',
              backgroundColor: 'var(--black)',
              ' &:hover': {
                backgroundColor: 'var(--grey)',
                border: '1px solid var(--lightGrey)',
              },
            }}
          />
        )}
      </IconButton>
    </>
  );
}

export default Sidebar;
