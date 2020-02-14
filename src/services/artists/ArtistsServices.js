import ArtistServiceDefinitions from './ArtistServiceDefinitions';
import Services from '../DefaultServices';

export default class ArtistServices extends Services {
  getAllArtists() {
    return this.get(ArtistServiceDefinitions.getArtist);
  }

  getArtistAlbums(data) {
    return this.get(ArtistServiceDefinitions.getArtistAlbum(data));
  }

  getAlbumsSongs(data) {
    return this.get(ArtistServiceDefinitions.getAlbumSong(data));
  }
}
