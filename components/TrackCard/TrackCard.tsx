import { Track } from "../../interfaces/tracks";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { useGetArtistDataMutation } from "../../redux/artistAPI";
import {
  NewTrack,
  updateSingleSong,
} from "../../redux/features/player/musicPlayerSlice";
import {
  currentTrack as setCurrentTrack,
  setArtistName,
} from "../../redux/features/player/currentTracks";

type Props = {
  track: Track;
};

const TrackCard = ({ track }: Props) => {
  const dispatch = useDispatch();
  const [getArtistData] = useGetArtistDataMutation();

  const handlePlay = async (track: NewTrack) => {
    dispatch(updateSingleSong(track));
    dispatch(setCurrentTrack(track));
    const response = await getArtistData(
      track.album.artist as unknown as string
    );

    dispatch(setArtistName(response.data.data.name!));
  };
  return (
    <div className={styles.trackCard}>
      <picture>
        <img
          src={track.album?.image || track.image}
          alt={track.title}
          className={styles.albumImageFinded}
        />
      </picture>
      <span className={styles.artistTitle}>{track.title}</span>

      <div>
        <span>Song</span>
        <button
          className={styles.playButton}
          onClick={() => handlePlay(track as unknown as NewTrack)}
        >
          <PlayCircleIcon sx={{ fontSize: "2rem" }} />
        </button>
      </div>
    </div>
  );
};

export default TrackCard;
