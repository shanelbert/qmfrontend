import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React from 'react';
import Pengatur from './Pengatur';
import Pelapor from './Pelapor';
import Login from './Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/pengatur'>
          <Pengatur />
        </Route>
        <Route path='/pelapor'>
          <Pelapor />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
