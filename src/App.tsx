import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Navbar} from './components/Navbar'
import { Artist } from './components/Artists';
import { Album } from './components/Album';
import {Song} from './components/Songs'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

export interface allArtist {
  id: number;
  name: string;
  image: string;
  genres: string[];
  popularity: string;
  spotify_url: string;
  spotify_id: string;
  created_at: Date;
  updated_at: Date;
  handleChange: (id: number) => void;
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={'container-fluid'}>
        <Navbar />
        <Switch>
          <Route exact path={'/'} component={Artist}/>
          <Route exact path={'/:id/albums'} component={Album}/>
          <Route exact path={'/:id/songs'} component={Song}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
