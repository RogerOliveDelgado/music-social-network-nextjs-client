import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useGetPlaylistQuery } from "../../redux/playlistsAPI";

type Props = {
  anchorEl: any;
  open: boolean;
  handleClose: () => void;
};

export default function BasicMenu({ anchorEl, open, handleClose }: Props) {
  const userId = "6352bdddf65378d19833dc87";

  const {
    data: playlists,
    isLoading: isLoadingPlaylist,
    error: playlistError,
  } = useGetPlaylistQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

    const userPlaylists = playlists?.data?.playlists;



  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <h4>Select the playlist you want to add the track to:</h4>
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        {userPlaylists?.map((playlist: any) => (
          <MenuItem key={playlist.title} onClick={handleClose}>
            {playlist.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
