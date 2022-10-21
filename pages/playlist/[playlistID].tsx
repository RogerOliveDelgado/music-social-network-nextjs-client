import Layout from "../../components/Layout/Layout";

import styles from "./styles.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useGetPlaylistDetailsQuery } from "../../redux/playlistDetailsAPI";
import CreatePlaylist from "../../components/Playlist/CreatePlaylist";
import Searchbar from "../../components/Playlist/Searchbar/Searchbar";
import TrackList from "../../components/TrackList/TrackList";
import { useI18N } from "../../context/i18";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Track } from "../../interfaces/tracks";

const Playlist = (tracks: any) => {
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzUyYmRkZGY2NTM3OGQxOTgzM2RjODciLCJ1c2VybmFtZSI6InZpY3RvciIsImlhdCI6MTY2NjM2Njk0MSwiZXhwIjoxNjY2Nzk4OTQxfQ.2KBuSla7WzmE8ou6BFIQLQ0U-mZnf7oh4i2XzE0za_c";

  tracks = tracks.tracks;
  const { query } = useRouter();
  const { t } = useI18N();

  const {
    data: playlist,
    isLoading: isLoadingPlaylist,
    refetch,
    error: playlistError,
  } = useGetPlaylistDetailsQuery(query.playlistID, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce<string>(search, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setSearch(e.target.value);
    } else {
      setSearch("");
      setResults([]);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      const results = tracks.filter((track: any) =>
        track.title
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(debouncedValue.toLowerCase().replace(/\s/g, ""))
      );
      setResults(results);
    } else {
      setSearch("");
      setResults([]);
    }
  }, [debouncedValue]);

  const tracksExistInPlaylist = playlist?.data?.tracks?.length > 0;

  const [imagePlayList, setImagePlayList] = useState<string>(
    playlist?.data?.image
  );
  const [title, setTitle] = useState<string>(playlist?.data?.title);
  const [description, setDescription] = useState(playlist?.data?.description);
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    setTitle(playlist?.data?.title);
    setDescription(playlist?.data?.description);
    setImagePlayList(playlist?.data?.image);
  }, [playlist, change]);

  useEffect(() => {
    const getupdatedData = async () => {
      const response = await fetch(
        `http://localhost:4002/playlist/${query.playlistID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const data = await response.json();
      setImagePlayList(data?.data?.image);
      setDescription(data?.data?.description);
      setTitle(data?.data?.title);
    };
    getupdatedData();
  }, [change]);

  return (
    <>
      <Head>
        <title>{`${t("additional").app_name} - ${
          t("additional").playlist
        }`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {change}
      <Layout>
        <CreatePlaylist
          playlistId={true}
          title={title}
          image={imagePlayList}
          setImagePlayList={setImagePlayList}
          setTitle={setTitle}
          setDescription={setDescription}
          change={change}
          setChange={setChange}
          description={description}
        />
        {tracksExistInPlaylist ? (
          <>
            <div className={styles.playlist_tracks} onClick={refetch}>
              <TrackList
                name={playlist?.data?.title}
                tracks={playlist?.data?.tracks}
              />
            </div>
            <Searchbar handleChange={handleChange} />
            {results.length && search !== " " ? (
              <div className={styles.search_results} onClick={refetch}>
                <TrackList
                  name={`${results.length} results for "${search}"`}
                  tracks={results}
                />
              </div>
            ) : search !== "" ? (
              <div className={styles.no_results}>
                <h3>No results found for &quot;{search}&quot;</h3>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <Searchbar handleChange={handleChange} />
            {results.length && search !== " " ? (
              <div className={styles.search_results} onClick={refetch}>
                <TrackList
                  name={`${results.length} results for "${search}"`}
                  tracks={results}
                />
              </div>
            ) : search !== "" ? (
              <div className={styles.no_results}>
                <h3>No results found for &quot;{search}&quot;</h3>
              </div>
            ) : null}
          </>
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const req = await fetch("http://localhost:4002/track");
  const data = await req.json();
  const res = data.data;

  return {
    props: {
      tracks: res,
    },
  };
}

export default Playlist;
