import * as React from "react";
import Button from "@mui/material/Button";


type Props = {
  anchorEl: any;
  open: boolean;
  handleClose: () => void;
};

export default function BasicMenu({ anchorEl, open, handleClose }: Props) {
  const userId = "6352bdddf65378d19833dc87";




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
        {userPlaylists?.map((playlist: any) => (
          <MenuItem key={playlist.title} onClick={handleClose}>
            {playlist.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
