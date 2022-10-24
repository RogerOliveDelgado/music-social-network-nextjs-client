import React from 'react';
import { GetStaticProps } from 'next';

import Layout from '../../components/Layout/Layout';

import styles from './styles.module.css';
import { Artist } from '../../interfaces/ServerResponse';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  parsedArtist: Artist[];
};

export const getStaticProps: GetStaticProps = async () => {
  const BASE_URL_SPOTIFY = process.env.NEXT_PUBLIC_BACKEND_SPOTIFY_BACKEND;
  const response = await fetch(`${BASE_URL_SPOTIFY}/artist`);
  const result = await response.json();

  //This is necessary. What it does is that Next does not render all the tracks, but only the first 10 tracks so that the app is not so heavy.
  const parsedArtist = result.data
    // .slice(0, 75)
    .map((artist: Artist) => artist);

  return {
    props: { parsedArtist },
  };
};

const Search = ({ parsedArtist }: Props) => {
  const generateRandomNumbers = () => {
    const num1 = Math.floor(Math.random() * 255);
    const num2 = Math.floor(Math.random() * 255);
    const num3 = Math.floor(Math.random() * 255);

    return { num1, num2, num3 };
  };

  return (
    <Layout>
      <div className={styles.searchDiv}>
        <h3>Explorar todo</h3>
        <section className={styles.searchResults}>
          {parsedArtist.map((artist) => {
            const randomColor = `rgb(${generateRandomNumbers().num1} ${
              generateRandomNumbers().num2
            } ${generateRandomNumbers().num3})`;

            return (
              <Link href={`/artist/${artist._id}`} key={artist._id}>
                <div
                  className={styles.artistDiv}
                  style={{ backgroundColor: randomColor }}
                >
                  <p className={styles.artistName}>{artist.name}</p>
                  <picture>
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className={styles.artistImage}
                    />
                  </picture>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </Layout>
  );
};

export default Search;
