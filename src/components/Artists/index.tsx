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
        setArtists(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <div className={'row artist'}>
      {artists.map(art => {
        return <ItemArtist key={art.id} artist={art} />;
      })}
    </div>
  );
};
