import Link from "next/link";
import React from "react";
import { Playlist } from "../../../interfaces/playlistResponse";
import { useGetPlaylistQuery } from "../../../redux/playlistsAPI";
import styles from "./styles.module.css";

function PlaylistGrid() {
  const id = "63566ec7f9d5803a4019ed57";
  const {
    data: playlists,
    isLoading: isLoadingPlaylist,
    error: playlistError,
  } = useGetPlaylistQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <div className={styles.grid_container}>
        <div className={styles.playlists_header}>
          <p>Your playlists:</p>
        </div>
        {playlists ? (
          <div className={styles.playlists_list}>
            {playlists?.data?.playlists.map((playlist: Playlist) => (
              <>
                <div
                  // href={`/playlist`}
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
