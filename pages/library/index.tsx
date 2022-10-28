import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Row from "../../components/Row/Row";
import { useGetAlbumsQuery } from "../../redux/albumAPI";
import GridLayout from "../../components/GridLayout/GridLayout";
import RowSkeleton from "../../components/RowSkeleton/RowSkeleton";
import Button from "@mui/material/Button";
import { useI18N } from "../../context/i18";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useGetArtistsQuery } from "../../redux/artistAPI";
import { useGetPlaylistQuery } from "../../redux/playlistsAPI";
import { useCookies } from "react-cookie";
import { useGetUserQuery } from "../../redux/userAPI";

type Props = {};
interface View {
  [view: string]: boolean;
}

const Library = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "userToken",
  ]);

  const [background, setBackground] = useState(false);

  const [filter, setFilter] = useState<View>({
    all: true,
  });
  const store = useSelector((state: RootState) => state);
  const {
    data: albums,
    isLoading,
    error,
  } = useGetAlbumsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: artists,
    isLoading: isLoadingArtist,
    error: artistsError,
  } = useGetArtistsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: playlist,
    isLoading: isLoadingPlaylist,
    error: playlistError,
  } = useGetPlaylistQuery(
    { userID: cookies.userID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useGetUserQuery(
    { id: cookies.userID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(user);

  const { t } = useI18N();

  const handleView = (view: string) => {
    setFilter({ [view]: true });
  };

  const isThereAnyArtist = user?.data.artists.length! > 0;
  const isThereAnyAlbum = user?.data.albums.length! > 0;
  const isThereAnyPlaylist = user?.data.playlists.length! > 0;

  return (
    <>
      <Head>
        <title>{`${t("additional").app_name} - ${t("home").library}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={`${styles.library_header} ${styles.library_header_bg}`}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleView("all")}
            className={filter.all ? styles.active_view : styles.inactive_view}
          >
            {t("additional").all}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleView("albums")}
            className={
              filter?.albums ? styles.active_view : styles.inactive_view
            }
          >
            {t("additional").albums}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleView("artists")}
            className={
              filter?.artists ? styles.active_view : styles.inactive_view
            }
          >
            {t("additional").artists}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleView("playlist")}
            className={
              filter?.playlist ? styles.active_view : styles.inactive_view
            }
          >
            {t("additional").playlist}
          </Button>
        </div>
        <div className={styles.library_content}>
          {filter?.all ? (
            <>
              {user?.data.albums.length === 0 &&
                user?.data.artists.length === 0 &&
                user?.data.playlists.length === 0 && (
                  <h3>{t("additional").emptyMessage}</h3>
                )}

              {user?.data.albums.length === 0 ? (
                <></>
              ) : isLoading ? (
                <RowSkeleton />
              ) : (
                <Row title={t("additional").albums} data={user?.data.albums} />
              )}

              {user?.data.artists.length === 0 ? (
                <></>
              ) : isLoading ? (
                <RowSkeleton />
              ) : (
                <Row
                  title={t("additional").artists}
                  data={user?.data.artists}
                />
              )}

              {user?.data.playlists.length === 0 ? (
                <></>
              ) : isLoading ? (
                <RowSkeleton />
              ) : (
                <Row
                  title={t("additional").playlist}
                  data={user?.data.playlists}
                />
              )}
            </>
          ) : (
            <></>
          )}

          {filter?.albums && isThereAnyAlbum ? (
            <>
              <GridLayout data={user?.data.albums} />
            </>
          ) : (
            filter?.albums &&
            !isThereAnyAlbum && (
              <>
                <GridLayout noData={t("content").albums} />
              </>
            )
          )}
          {filter?.artists && isThereAnyArtist ? (
            <GridLayout data={user?.data.artists} />
          ) : (
            filter?.artists &&
            !isThereAnyArtist && (
              <>
                <GridLayout noData={t("content").artists} />
              </>
            )
          )}
          {filter?.playlist && isThereAnyPlaylist ? (
            <GridLayout data={user?.data.playlists} />
          ) : (
            filter?.playlist &&
            !isThereAnyPlaylist && (
              <>
                <GridLayout noData={t("content").playlists} />
              </>
            )
          )}
        </div>
      </Layout>
    </>
  );
};

export default Library;
