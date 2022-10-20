import AlbumCard from "../AlbumCard/AlbumCard";
import { Artist } from "../../interfaces/ServerResponse";
import { Album } from "../../interfaces/ServerResponse";
import { Playlist } from "../../interfaces/playlistResponse";

import styles from "./styles.module.css";

type Props = {};

const Row = ({ title, data, children }: any) => {
  console.log(data);

  return (
    <div className={styles.row_container}>
      <div className={styles.row_header}>
        <h2>{title}</h2>
      </div>
      <div className={styles.horizontal_scroll}>
        {!children &&
          data &&
          data.slice(0, 11).map((item: Album | Artist | Playlist) => {
            return <AlbumCard key={item._id} item={item} />;
          })}
        {children}
      </div>
    </div>
  );
};

export default Row;
