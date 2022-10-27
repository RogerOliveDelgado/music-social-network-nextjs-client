import styles from './styles.module.css';
import { Album } from '../../interfaces/albumResponse';
import { Artist } from '../../interfaces/artistResponse';
import { Playlist } from '../../interfaces/playlistResponse';
import AlbumCard from '../AlbumCard/AlbumCard';

import { useI18N } from '../../context/i18';

type Props = {
  data?: Album[] | Artist[] | Playlist[];
  noData?: string;
};

const GridLayout = ({ data, noData }: Props) => {
  return (
    <>
      {data ? (
        <div className={styles.grid_container}>
          {data?.map((item) => {
            return <AlbumCard key={item._id} item={item} />;
          })}
        </div>
      ) : (
        <h3>{noData}</h3>
      )}
    </>
  );
};

export default GridLayout;
