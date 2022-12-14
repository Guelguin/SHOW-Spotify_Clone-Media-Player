import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Albums } from './../../components/albums/Albums';
import { PageHeader } from './../../components/navigation/PageHeader';
import { fetchFavorites, useFav } from './../../context/favoritesContext';
import { usePlay } from './../../context/playerContext';
import { fetchPlaylist } from './../../helpers/fetchPlaylist';
import { PlaylistData, Props } from './../../helpers/types';
import styles from './../../styles/Page.module.css';

const AlbumsPage: NextPage<Props> = (props: any) => {
  const { initQueue } = usePlay();
  const { setFav } = useFav();

  useEffect(() => {
    initQueue(props.playlist.tracks.map((e: any) => e.track));
    setFav(props.favorites);
  }, []);

  return (
    <div className={styles.container}>
      <PageHeader text="Albums"></PageHeader>
      <Albums playlist={props.playlist}></Albums>
    </div>
  );
};

export async function getStaticProps(context: any) {
  var playlistData: PlaylistData = await fetchPlaylist();
  var favorites = fetchFavorites(context, playlistData);

  return {
    props: {
      playlist: playlistData,
      favorites: favorites
    }
  };
}

export default AlbumsPage;
