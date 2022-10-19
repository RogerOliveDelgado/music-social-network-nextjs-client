import Layout from "../components/Layout/Layout";

import styles from "./styles.module.css";
import Head from "next/head";
import TabPanel from "../components/TabPanel/TabPanel";
import { useRouter } from "next/router";
import { useGetPlaylistQuery } from "../redux/playlistAPI";
import CreatePlaylist from "../components/Playlist/CreatePlaylist";
import Searchbar from "../components/Playlist/Searchbar/Searchbar";
import { useI18N } from "../context/i18";


const Playlist = () => {
  const { query } = useRouter();
  const { t } = useI18N();

  const {
    data: playlist,
    isLoading: isLoadingPlaylist,
    error: playlistError,
  } = useGetPlaylistQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });


  return (
    <>
      <Head>
      <title>{`${t("additional").app_name} - ${t("home").playlist}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <CreatePlaylist />
        <Searchbar />
        <TabPanel data={playlist?.data} />
      </Layout>
    </>
  );
};

export default Playlist;
