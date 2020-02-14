import React, { useState, useEffect } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

interface iArtist {
  id: number;
  name: string;
  image: string;
  popularity: string;
}

interface iProps {
  artist: iArtist;
}

export const ItemArtist: React.FC<iProps> = ({
  artist: { name, id, image, popularity }
}) => {

  return (
    <Link
      to={{pathname: `/${id}/albums`, state: {name, image, popularity}}}
      className={'artist-main'}
      style={{
        backgroundImage:
          'linear-gradient( to bottom,rgba(34, 41, 30, 0),rgba(34, 32, 41, 0.8)),     url(' +
          image +
          ')'
      }}
    >
      <h1 className={'artist-heading'}>{name}</h1>
    </Link>
  );
};


// const newTo = (id:number, name:string, image:string, popularity:string) => {
//     return {
//       url: `/${id}/albums`,
//       name,
//       image,
//       popularity
//     }
// }