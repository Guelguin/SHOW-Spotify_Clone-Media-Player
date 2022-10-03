import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react';



import styles from '../styles/Home.module.css'


import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Playlist } from '../components/playlist/playlist';
import { Player } from '../components/player/player';


// This is a nice way to get only the data needed for the project
const GET_PLAYLIST = gql`
    query getUrl {
      playlist {
        name
        images {
          url
        }
        tracks {
          added_at
          track {
            id
            name
            preview_url
            album {
                name
                images {
                  height
                  width
                  url
                }
              }
              artists {
                name
              }
          }
        }
      }
    }
    `;



const Home: NextPage = () => {
  const router = useRouter()

  const { loading, error, data } = useQuery(GET_PLAYLIST);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>{router.pathname == "/favorites" ? "fav" : "index"}</title>

        <meta name="description" content="Generated by create next app" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Playlist playlist={data.playlist}></Playlist>
        <Player tracks={data.playlist.tracks}></Player>

      </main>

      <footer className={styles.footer}>
        <div>MENU</div>
      </footer>
    </div>
  )
}

export default Home
