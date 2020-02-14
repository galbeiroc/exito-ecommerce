import React, { useState, useEffect } from 'react';
import { ArtistServices } from '../../services/index';
import { ItemSong } from './ItemSong';
import { RouteComponentProps } from 'react-router-dom';
import './style.scss';
import { ItemAlbum } from '../Album/ItemAlbum';

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
  const [infoAlbum, setInfoAlbum] = useState<iPropsSongs[]>([]);
  const services = new ArtistServices();
  console.log(id);

  const getInfoAlbumSongs = (): void => {
    services
      .getAlbumsSongs(id)
      .then((res: any) => {
        console.log('res.data', res.data);
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

  const mapAlbumSong = filterXAlbum.map(song =>
    song.songs.map((track, i) => {
      const tt: number = parseInt(track.duration_ms)
      return (
        <tr key={track.id} className={'selected-row'}>
        <td>{i}</td>
        <td>{track.name}</td>
        <td>{ConvertMillMin(tt)}</td>
        <td>50</td>
      </tr>
      )
    })
  );

  useEffect(() => {
    getInfoAlbumSongs();
  }, []);
  return (
    <div>
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
    </div>
  );
};
