import { Artist } from '../../interfaces/ServerResponse';
import styles from './style.module.css';

type Props = {};

const MusicGenre = ({ genre, selected, selectGenre, image }: any) => {
  return (
    <div
      className={styles.box}
      onClick={() => selectGenre(genre)}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={`${styles.content} ${selected && styles.selected_genre}`}>
        <h2>{genre}</h2>
      </div>
    </div>
  );
};

export default MusicGenre;
