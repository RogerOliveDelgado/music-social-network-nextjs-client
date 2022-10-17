import styles from './styles.module.css';
import { Album } from '../../interfaces/albumResponse';
import { Artist } from '../../interfaces/artistResponse';
import AlbumCard from '../AlbumCard/AlbumCard';

type Props = {
  data: Album[] | Artist[];
};

const GridLayout = ({ data }: Props) => {
  return (
    <div className={styles.grid_container}>
      {data.map((item) => {
        return <AlbumCard key={item._id} item={item} />;
      })}
    </div>
  );
};

export default GridLayout;
