import styles from "./styles.module.css";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAddItemToLibraryMutation } from "../../redux/albumAPI";
import { useState, useEffect } from "react";
import { Artist, Album, Track } from "../../interfaces/ServerResponse";
import { useCookies } from "react-cookie";

type Props = {
  isFollowed: boolean;
  id: string;
  type: string;
};

const FollowButton = ({ isFollowed, id, type }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "userToken",
  ]);

  const [addItem] = useAddItemToLibraryMutation();
  const [follow, setFollow] = useState(isFollowed);

  const handleClick = async () => {
    const response = await addItem({
      name: type,
      id: id,
      token: cookies.userToken,
    });
    if (response?.error) return;
    if (response?.data) {
      setFollow((state: boolean) => !state);
    }
  };

  return (
    <Button
      className={follow ? styles.follow_button_added : styles.follow_button}
      variant="contained"
      color="inherit"
      startIcon={<FavoriteBorderIcon />}
      onClick={handleClick}
      sx={{
        " &: hover": {
          backgroundColor: "#ffefefe7",
          color: "var(--black)",
          opacity: 1,
          ' & .css-i4bv87-MuiSvgIcon-root': {
            color: "red",
          },
        },
      }}
    >
      {follow ? "Followed" : "Follow"}
    </Button>
  );
};

export default FollowButton;
