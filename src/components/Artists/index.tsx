import React, { useState, useEffect } from 'react';
import { ArtistServices } from '../../services/index';
import { ItemArtist } from './ItemArtist';
import './style.scss';

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

export const Artist: React.FC = () => {
  const [artists, setArtists] = useState<allArtist[]>([]);

  const services = new ArtistServices();

  const getArtist = () => {
    services
      .getAllArtists()
      .then((res: any) => {
        console.log('res.data artists', res.data);
        setArtists(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getArtist();
    console.log('artists', artists);
  }, []);

  return (
    <div className={'row artist'}>
      {artists.map(e => {
        return <ItemArtist key={e.id} artist={e} />;
      })}
    </div>
  );
};
