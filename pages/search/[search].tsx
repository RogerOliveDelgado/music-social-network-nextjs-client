import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import useDebounce from "../../hook/useDebounce";
import { Artist } from "../../interfaces/ServerResponse";
import { Album } from "../../interfaces/ServerResponse";
import { Track } from "../../interfaces/tracks";
import { useGetSearchQuery } from "../../redux/searchAPI";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import styles from "./styles.module.css";
import Link from "next/link";

type Props = {};

const Search = (props: Props) => {
  const router = useRouter();

  const {
    data: search,
    isLoading,
    error,
  } = useGetSearchQuery(router.query.search);

  return (
    <Layout>
      <div className={styles.searchDiv}>
        <h2>Busquedas para: {router.query.search}</h2>
        {!isLoading ? (
          <section className={styles.searchResults}>
            <div className={styles.albumsFinded}>
              <h3>Albums</h3>
              <section className={styles.sectionFinded}>
                {search?.data.albums.length > 0 ? (
                  search?.data.albums
                    .slice(0, 20)
                    .map((album: Album, index: number) => {
                      return (
                        <Link key={index} href={`/album/${album._id}`}>
                          <div className={styles.albumCard}>
                            <picture>
                              <img
                                src={album.artist.image}
                                alt={album.title}
                                className={styles.albumImageFinded}
                              ></img>
                            </picture>
                            <span className={styles.albumTitle}>
                              {album.title}
                            </span>
                            <div>
                              <span>
                                {album.releaseDate.split("T")[0].split("-")[0]}
                              </span>
                              <span> • </span>
                              <span>Album</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                ) : (
                  <span className={styles.nothing}>
                    No se encontró nada para &quot;{router.query.search}&quot;.
                  </span>
                )}
              </section>
            </div>
            <div className={styles.artistsFinded}>
              <h3>Artists</h3>
              <section className={styles.sectionFinded}>
                {search?.data.artists.length > 0 ? (
                  search?.data.artists
                    .slice(0, 20)
                    .map((artist: Artist, index: number) => {
                      return (
                        <Link key={index} href={`/artist/${artist._id}`}>
                          <div className={styles.artistCard}>
                            <picture>
                              <img
                                src={artist.image}
                                alt={artist.name}
                                className={styles.artistImageFinded}
                              ></img>
                            </picture>
                            <span className={styles.artistTitle}>
                              {artist.name}
                            </span>
                            <span>Artist</span>
                          </div>
                        </Link>
                      );
                    })
                ) : (
                  <span className={styles.nothing}>
                    No se encontró nada para &quot;{router.query.search}&quot;.
                  </span>
                )}
              </section>
            </div>
            <div className={styles.tracksFinded}>
              <h3>Tracks</h3>
              <section className={styles.sectionFinded}>
                {search?.data.tracks.length > 0 ? (
                  search?.data.tracks
                    .slice(0, 20)
                    .map((track: Track, index: number) => {
                      return (
                        <div key={index} className={styles.trackCard}>
                          <picture>
                            <img
                              src={track.album.image}
                              alt={track.title}
                              className={styles.albumImageFinded}
                            />
                          </picture>
                          <span className={styles.artistTitle}>
                            {track.title}
                          </span>

                          <div>
                            <span>Song</span>
                            <button className={styles.playButton}>
                              <PlayCircleIcon sx={{ fontSize: "2rem" }} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <span className={styles.nothing}>
                    No se encontró nada para &quot;{router.query.search}&quot;.
                  </span>
                )}
              </section>
            </div>
          </section>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default Search;
