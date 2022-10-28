import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Playlist } from "../../../interfaces/playlistResponse";
import { useGetPlaylistQuery } from "../../../redux/playlistsAPI";
import { useCookies } from "react-cookie";
import styles from "./styles.module.css";
import { useI18N } from "../../../context/i18";

function PlaylistGrid() {
  const id = "63566ec7f9d5803a4019ed57";
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "userToken",
  ]);
  const {
    data: playlists,
    isLoading: isLoadingPlaylist,
    error: playlistError,
  } = useGetPlaylistQuery(
    { userID: cookies.userID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const router = useRouter();

  const redirect = (playlistID: any) => {
    router.push(`/playlist/${playlistID}`);
  };

  const { t } = useI18N();

  return (
    <>
      <div className={styles.grid_container}>
        <div className={styles.playlists_header}>
          <p>{t("content").trackList}</p>
        </div>
        {playlists ? (
          <div className={styles.playlists_list}>
            {playlists?.data?.playlists.map((playlist: Playlist) => (
              <>
                <div
                  onClick={() => redirect(playlist._id)}
                  className={styles.playlist_row}
                  key={playlist._id}
                >
                  <picture>
                    <img
                      className={styles.playlist_image}
                      src={playlist.image}
                      alt={playlist.title}
                    />
                  </picture>
                  <h3>{playlist.title}</h3>
                </div>
              </>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default PlaylistGrid;
