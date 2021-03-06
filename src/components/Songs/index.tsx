import React, { useState, useEffect } from 'react';
import { ArtistServices } from '../../services/index';
import { RouteComponentProps } from 'react-router-dom';
import { Modal } from '../Modal/Modal';
import './style.scss';
import { Link } from 'react-router-dom';

interface iSongsProps extends RouteComponentProps<{ id: string }> {}

interface iSongs {
  id: number;
  name: string;
  spotify_url: string;
  preview_url: string;
  duration_ms: string;
  explicit: string;
}

interface iPropsSongs {
  album: number;
  songs: Array<iSongs>;
}

export const Song: React.FC<iSongsProps> = ({
  history,
  match: {
    params: { id }
  }
}) => {

  const infoArtistAlbum = history.location.state;
  const [infoAlbum, setInfoAlbum] = useState<iPropsSongs[]>([]);
  const [compArtist, setCompArtist] = useState<any>(infoArtistAlbum);
  const [songs, setSongs] = useState<Array<object>>([]);
  const [moldalOpen, setModalOpen] = useState<boolean>(false)

  const services = new ArtistServices();
  const { name, image, total_tracks, artist } = compArtist;

  const getInfoAlbumSongs = (): void => {
    services
      .getAlbumsSongs(id)
      .then((res: any) => {
        setInfoAlbum(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const filterXAlbum = infoAlbum.filter(alb => {
    const album: number = parseInt(id);
    return alb.album === album;
  });

  const ConvertMillMin = (millsecond: number): string => {
    const min: number = Math.floor((millsecond / 1000 / 60) << 0);
    const sec: number = Math.floor((millsecond / 1000) % 60);

    const timeValue: string = `${min}:${sec}`;
    return timeValue;
  };

  const playSong = (idSong: number)=> {
    const arrSong: Array<object> = [];

    const mapSongs = filterXAlbum.map(song => song.songs).flat();
    const findSong = mapSongs.filter(e => e.id === idSong);
    const filterSong = mapSongs.filter(e => e.id !== idSong);
    
    for (let i = 0; i < 2; i++) {
      arrSong[i] = filterSong[Math.floor(Math.random() * filterSong.length)];
    }
   
    setSongs(arrSong.concat(findSong).reverse());
    setModalOpen(true)

  };

  useEffect(() => {
    getInfoAlbumSongs();
  }, []);

  const mapAlbumSong = filterXAlbum.map(song =>
    song.songs.map((track, i) => {
      const timeSong: number = parseInt(track.duration_ms);
      return (
        <tr
          key={track.id}
          className={'selected-row'}
          onClick={() => playSong(track.id)}
        >
          <td className={'number-track'}>{i}</td>
          <td>{track.name}</td>
          <td>{ConvertMillMin(timeSong)}</td>
          <td>{artist.name}</td>
        </tr>
      );
    })
  );


  return (
    <div className={'content-art-album-song'}>
      <div className="content-art-album">
        <button className={'btn-back-album'} onClick={() => history.goBack()}>
          <i className="fas fa-angle-left"></i>atrás
        </button>
        <div className="content-art-song-img">
          <div>
            <img
              src={artist.image}
              className="rounded mx-auto d-block album-art-img"
              alt="..."
            />
            <p className="name-album-song-art">{artist.name}</p>
            <p className="name-album-song-art">
              Calificación: <i className="fas fa-star"></i> {artist.popularity}
            </p>
          </div>
          <div>
            <h1 className={'playlist'}>Playlist</h1>
          </div>
          <div>
            <img
              src={image}
              className="rounded mx-auto d-block album-song-art-img"
              alt="..."
            />
            <p className="name-album-song">{name}</p>
            <p className="name-album-song">Canciones: {total_tracks}</p>
          </div>
        </div>
      </div>
      <div className="content-song">
        <table className={'table table-hover'}>
          <thead className={'thead-dark'}>
            <tr>
              <th>N°.</th>
              <th>Name</th>
              <th>Time</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>{mapAlbumSong}</tbody>
        </table>
      </div>
      {!moldalOpen ? null : <Modal  mdlOpen={moldalOpen} songs={songs}/>}
    </div>
  );
};
