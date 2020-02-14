import React, { useState, useEffect } from 'react';
import { ItemAlbum } from './ItemAlbum';
import { ArtistServices } from '../../services/index';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import './style.scss';

interface RouterProps {
  id: string;
}

interface albumsProps extends RouteComponentProps<RouterProps> {}

interface IObjectAlbum {
  id: number;
  name: string;
  image: string;
  spotify_url: string;
  total_tracks: number;
}

interface IProps {
  artist: number;
  albums: Array<IObjectAlbum>;
}

interface allArtist {
  id: number;
  name: string;
  image: string;
  popularity: number;
}

interface iAlbum {
  id: number;
  name: string;
  image: string;
  spotify_url: string;
  total_tracks: number;
}

export const Album: React.FC<albumsProps> = ({
  history,
  match: {
    params: { id }
  }
}) => {
  const [infoArtist, setInfoArtist] = useState<IProps[]>([]);
  const [nameArtist, setNameArtist] = useState({});
  const [artists, setArtists] = useState<allArtist[]>([]);
  const services = new ArtistServices();

  const getInfoArtistAlbum = (): void => {
    services
      .getArtistAlbums(id)
      .then((res: any) => {
        console.log('res.data', res.data);
        setInfoArtist(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const getArtist = (): void => {
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
    getInfoArtistAlbum();
    getArtist();
  }, []);

  const filterArtist = artists.find(e => {
    const artist: number = parseInt(id);
    return e.id === artist;
  });

  const filterAlbumArtist = infoArtist.filter(e => {
    const artist: number = parseInt(id);
    return e.artist === artist;
  });

  const mapAlbums = filterAlbumArtist.map(elem =>
    elem.albums.map(alb => (
      <ul key={alb.id} className={'album-items'}>
        <ItemAlbum album={alb} />
      </ul>
    ))
  );

  return (
    <div>
      <div className={'artist-content'}>
        <button className={'btn-back'} onClick={() => history.goBack()}>
          <i className="fas fa-angle-left"></i>atrás
        </button>
        <img src={filterArtist?.image} className={'artist-img'} />
        <h6 className={'artist-name'}>
          {filterArtist?.name}
          <sup className={'artist-rank'}>
            <i className="fas fa-star"></i>
            {filterArtist?.popularity}
          </sup>
        </h6>
      </div>
      <div className={'album-content'}>
        <h4 className={'album-heading'}>álbumes</h4>
        {mapAlbums}
      </div>
    </div>
  );
};
