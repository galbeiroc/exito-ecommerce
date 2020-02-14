import { API_PATH } from '../../config';

const ArtistServiceDefinitions = Object.freeze({
  getArtist: `${API_PATH}artists`,
  getArtistAlbum: idArtist => { return `${API_PATH}artists/:${idArtist}/albums`},
  getAlbumSong: idAlbum => { return `${API_PATH}albums/:${idAlbum}/songs`},
});

export default ArtistServiceDefinitions;
