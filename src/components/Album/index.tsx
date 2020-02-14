import React, { useState, useEffect } from 'react';
import { ItemAlbum } from './ItemAlbum';
import { ArtistServices } from '../../services/index';
import { RouteComponentProps } from 'react-router-dom';
import './style.scss';

interface albumsProps extends RouteComponentProps<{ id: string }> {}

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
  let getArtist: any = history.location.state;
  const [infoArtist, setInfoArtist] = useState<IProps[]>([]);
  const [artists, setArtists] = useState<any>(getArtist);
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

  useEffect(() => {
    getInfoArtistAlbum();
  }, []);

  const filterAlbumArtist = infoArtist.filter(e => {
    const artist: number = parseInt(id);
    return e.artist === artist;
  });

  const mapAlbums = filterAlbumArtist.map(elem =>
    elem.albums.map(alb => (
      <ul key={alb.id} className={'album-items'}>
        <ItemAlbum album={alb} artist={artists} />
      </ul>
    ))
  );

  const { name, image, popularity } = artists;
  return (
    <div className={'content-album-art'}>
      <div className={'artist-content'}>
        <button className={'btn-back'} onClick={() => history.goBack()}>
          <i className="fas fa-angle-left"></i>atrás
        </button>
        <img src={image} className={'artist-img'} />
        <h6 className={'artist-name'}>
          {name}
          <sup className={'artist-rank'}>
            <i className="fas fa-star"></i>
            {popularity}
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
