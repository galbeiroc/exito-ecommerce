import React from 'react';
import './style.scss';

interface iAlbum {
  id: number;
  name: string;
  image: string;
  spotify_url: string;
  total_tracks: number;
}

interface iProps {
  album: iAlbum;
}

export const ItemAlbum: React.FC<iProps> = ({
  album: { id, name, image, spotify_url, total_tracks }
}) => {
  return (
    <div className={'content-item'}>
      <li className={'album-detail'}>
        <img src={image} className={'bar-item album-img'} />
        <div className={'bar-item album-text'}>
          <span className={'bar-item album-name'}>{name}</span>
          <br />
          <span className={'bar-item album-track'}>
            Canciones: {total_tracks}
          </span>
          <i className="fas fa-play play-album"></i>
        </div>
      </li>
    </div>
  );
};
