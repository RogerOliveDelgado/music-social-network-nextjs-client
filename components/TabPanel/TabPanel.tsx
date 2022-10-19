import { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './styles.module.css';
import TrackList from '../../components/TrackList/TrackList';
import { Track } from '../../interfaces/artistResponse';

interface TabPanelProps {
  data: Track[];
  artist: string;
}
interface TabsInterface {
  [tab: string]: boolean;
}

const TabPanel = ({ data, artist }: TabPanelProps) => {
  const [tabs, setTabs] = useState<TabsInterface>({
    general: true,
  });

  const onSelectTab = (tab: string) => {
    setTabs({ [tab]: true });
  };

  return (
    <div className={styles.tabs_panel}>
      <div className={styles.tabs_buttons}>
        <Button
          variant="text"
          onClick={() => onSelectTab('general')}
          className={
            tabs?.general ? styles.tab_button_selected : styles.tab_button
          }
        >
          General
        </Button>
        <Button
          variant="text"
          onClick={() => onSelectTab('tracks')}
          className={
            tabs?.tracks ? styles.tab_button_selected : styles.tab_button
          }
        >
          Tracks
        </Button>
        <Button
          variant="text"
          onClick={() => onSelectTab('albums')}
          className={
            tabs?.albums ? styles.tab_button_selected : styles.tab_button
          }
        >
          Albums
        </Button>
      </div>
      <div className={styles.tabs_content}>
        {tabs?.general && (
          <div className={styles.trackList_container}>
            <TrackList name={`Top Tracks`} tracks={data} artist={artist} />
          </div>
        )}
        {tabs?.tracks && (
          <div className={styles.trackList_container}>
            {/* <TrackList name="All Tracks Artist Details" /> */}
          </div>
        )}
        {tabs?.albums && <p>Aqui va la Grid de Albums</p>}
      </div>
    </div>
  );
};

export default TabPanel;
