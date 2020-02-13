import React from 'react';
import './style.scss';

interface iArtist {
  id: number;
  name: string;
  image: string;
}

interface iProps {
  artist: iArtist;
}

export const Artist: React.FC<iProps> = ({ artist: { name, id, image } }) => {
  return (
    <div
      className={'artist-main'}
      style={{
        backgroundImage:
          'linear-gradient( to bottom,rgba(34, 41, 30, 0),rgba(34, 32, 41, 0.8)),     url(' +
          image +
          ')'
      }}
    >
      <h1 className={'artist-heading'}>{name}</h1>
    </div>
  );
};

//url(' + image + ')
