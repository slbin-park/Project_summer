import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignPage from './page/Sign'; 
import MainPage from './page/Main';
import { Link } from 'react-router-dom';


function App({ location, history }) { 
  return ( 
    <> 
      <Router> 
        <Switch> 
          <Route path='/sign' component={SignPage} /> 
          <Route path='/main' component={MainPage} /> 
          <Link to='/sign'>sign</Link>
        </Switch> 
      </Router> 
    </> 
          ); }
export default App;

