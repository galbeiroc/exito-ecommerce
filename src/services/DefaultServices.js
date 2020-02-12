import axios from 'axios';

class Services {
  constructor() {
    this.axios = axios;
  }

  get(url, data, config) {
    console.log('url 🐒 get', url, this.axios.defaults.headers);
    return this.axios.get(url, data, config);
  }
}


export default Services;