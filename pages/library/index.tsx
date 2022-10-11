import Layout from '../../components/Layout/Layout';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import { updateTrackList } from '../../redux/features/player/musicPlayerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TracksList } from '../../redux/features/player/musicPlayerSlice';
import Button from '@mui/material/Button';
import Row from '../../components/Row/Row';

import styles from './styles.module.css';

type Props = {};

const playlist = [
  {
    id: 1,
    title: 'Track 1',
    artist: 'Artist 1',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Track 2',
    artist: 'Artist 2',
    src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3',
  },
  {
    id: 3,
    title: 'Track 3',
    artist: 'Artist 3',
    src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3',
  },
];

const Library = (props: Props) => {
  const dispatch = useDispatch();
  const tracks = useSelector((state: TracksList) => state.tracks);

  return (
    <>
      <Layout>
          <Row title="Albums">
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
          </Row>
          <Row title="Artist" />
      </Layout>
    </>
  );
};

export default Library;
