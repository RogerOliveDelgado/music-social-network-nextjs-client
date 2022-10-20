import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import useDebounce from "../../hook/useDebounce";
import { Artist } from "../../interfaces/artistResponse";
import { Album } from "../../interfaces/albumResponse";
import { Track } from "../../interfaces/tracks";
import { useGetSearchQuery } from "../../redux/searchAPI";

import styles from "./styles.module.css";

type Props = {};

const Search = (props: Props) => {
  const router = useRouter();

  const {
    data: search,
    isLoading,
    error,
  } = useGetSearchQuery(router.query.search);

  console.log(search?.data);

  return (
    <Layout>
      <div className={styles.searchDiv}>
        <h2>Busquedas para: {router.query.search}</h2>
        {!isLoading ? (
          <section className={styles.searchResults}>
            <div className={styles.albumsFinded}>
              <h3>Albums</h3>
              <section className={styles.sectionFinded}>
                {search?.data.albums
                  .slice(0, 20)
                  .map((album: Album, index: number) => {
                    return (
                      <div key={index} className={styles.albumCard}>
                        <picture>
                          <img
                            src={album.artist.image}
                            alt={album.title}
                            className={styles.albumImageFinded}
                          ></img>
                        </picture>
                        <span className={styles.albumTitle}>{album.title}</span>
                        <div>
                          <span>
                            {album.releaseDate.split("T")[0].split("-")[0]}
                          </span>
                          <span> • </span>
                          <span>Album</span>
                        </div>
                      </div>
                    );
                  })}
              </section>
            </div>
            <div className={styles.artistsFinded}>
              <h3>Artists</h3>
              <section className={styles.sectionFinded}>
                {search?.data.artists
                  .slice(0, 20)
                  .map((artist: Artist, index: number) => {
                    return (
                      <div key={index} className={styles.albumCard}>
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
                    );
                  })}
              </section>
            </div>
            <div className={styles.tracksFinded}>
              <h3>Tracks</h3>
              <section className={styles.sectionFinded}>
                {search?.data.tracks
                  .slice(0, 20)
                  .map((track: Track, index: number) => {
                    return (
                      <div key={index} className={styles.albumCard}>
                        <picture>
                          <img
                            src={track.album.image}
                            alt={track.title}
                            className={styles.albumImageFinded}
                          ></img>
                        </picture>
                        <span className={styles.artistTitle}>
                          {track.title}
                        </span>
                        <span>Song</span>
                      </div>
                    );
                  })}
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
