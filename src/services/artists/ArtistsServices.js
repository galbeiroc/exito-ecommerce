import ArtistServiceDefinitions from './ArtistServiceDefinitions';
import Services from '../DefaultServices';

export default class ArtistServices extends Services {
  getAllArtists() {
    return this.get(ArtistServiceDefinitions.getArtist);
  }
}
