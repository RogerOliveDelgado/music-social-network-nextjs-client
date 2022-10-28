import { Button } from "@mui/material";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Tooltip from "@mui/material/Tooltip";
import FollowButton from "../../components/FollowButton/FollowButton";
import SkelettonButton from "../../components/SkelettonButton/SkelettonButton";
import { Album, Track, Artist, User } from "../../interfaces/ServerResponse";
import { useGetUserQuery } from "../../redux/userAPI";
import { useCookies } from "react-cookie";

import styles from "./styles.module.css";
import { useI18N } from "../../context/i18";

type Props = {
  album: Album;
  rating: number;
};

const AlbumHeader = ({ album, rating }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "userToken",
  ]);

  let isFollowed = undefined;

  let user = {
    _id: "",
    username: "",
    email: "",
    phone: "",
    image: "",
    playlists: [] as Track[],
    artists: [] as Artist[],
    albums: [] as Album[],
    likedSongs: [] as Track[],
    createdAt: "",
    updatedAt: "",
  };

  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserQuery({
    id: cookies.userID,
    token: cookies.userToken,
  });

  if (isSuccessUser) {
    user = dataUser.data;
    isFollowed = user.albums.some((albumX: Album) => albumX._id === album._id);
  }

  const { t } = useI18N();

  return (
    <>
      <Image
        className={styles.album_image}
        src={album.image}
        alt={album.title}
        width={200}
        height={200}
        layout="fixed"
      />
      <div className={styles.album_details_text}>
        <p className={styles.albums_ratings}>
          Album <Rating name="simple-controlled" value={rating} />
        </p>
        <h1 className={styles.album_name}>{album.title}</h1>
        <h2 className={styles.album_artist}>
          <InterpreterModeIcon />
          {album.artist.name}
        </h2>
          {isSuccessUser ? (
            <FollowButton isFollowed={isFollowed} id={album._id} type="album" />
          ) : (
            <SkelettonButton />
          )}
      </div>
      <div className={styles.play_button_container}>
        <Button
          className={styles.play_button}
          variant="contained"
          color="inherit"
          startIcon={<PlayArrowIcon />}
        >
          Play
        </Button>
      </div>
    </>
  );
};

export default AlbumHeader;
