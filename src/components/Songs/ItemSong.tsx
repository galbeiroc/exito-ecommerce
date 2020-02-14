import React from 'react';
import './style.scss';

interface iSongs {
  id: number;
}

interface iPropsSong {
  track: iSongs;
}

export const ItemSong: React.FC<iSongs> = id => {
  console.log(id);
  
  return (
    <div>
      <h1>FROM CHLDREN {id}</h1>
    </div>
  );
};
