import React, { useState, useEffect } from 'react';
import { ArtistServices } from './services/index';
import { Artist } from './components/Artists';
import './App.scss';

export interface allArtist {
  id: number;
  name: string;
  image: string;
  genres: string[];
  popularity: string;
  spotify_url: string;
  spotify_id: string;
  created_at: Date;
  updated_at: Date;
}

const App: React.FC = () => {
  const [artists, setArtists] = useState<allArtist[]>([]);

  const services = new ArtistServices();

  const getArtist = () => {
    services
      .getAllArtists()
      .then((res: any) => {
        console.log('res.data', res.data);
        setArtists(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getArtist();
    console.log('tt', artists);
  }, []);

  return (
    <div className={'container'}>
      <div className={'main-title'}>
      <h1 className={'main-heading'}>éxito play music </h1>
      <h5 className={'main-subheading'}>lista de artistas</h5>
      </div>
      <div className={'row artist'}>
        {artists.map(e => {
          return <Artist key={e.id} artist={e} />;
        })}
      </div>
    </div>
  );
};

export default App;
