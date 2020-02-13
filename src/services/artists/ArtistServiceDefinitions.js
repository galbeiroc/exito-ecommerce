import { API_PATH } from '../../config';

const ArtistServiceDefinitions = Object.freeze({
  getArtist: `${API_PATH}artists`,
  getArtistAlbum: idArtist => { return `${API_PATH}artists/:${idArtist}/albums`},
});

export default ArtistServiceDefinitions;
