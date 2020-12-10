// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from 'react';
import Pengatur from './Pengatur';
import Pelapor from './Pelapor';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/a'>
          <Pengatur />
        </Route>
        <Route path='/o'>
          <Pelapor />
        </Route>
      </Switch>
    </Router>

  )
}

export default App;
