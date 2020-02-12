import React, { useState, useEffect } from 'react';
import './style.css';
import { ArtistServices } from '../../services/index';

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [reload, setReload] = useState(true);
  const services = new ArtistServices();

  const getArtist = () => {
    services
      .getAllArtists()
      .then(res => {
        console.log('res.data', res.data);
        setArtists(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (reload) {
      getArtist();
      setReload(false);
    }
  }, [reload]);

  return (
    <div>
      <h1>Artist</h1>
    </div>
  );
};

export default Artist;
