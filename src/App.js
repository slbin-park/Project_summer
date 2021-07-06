import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignPage from './page/Sign'; 
import MainPage from './page/Main';
import Menupage from './page/Menupage';
import { Link } from 'react-router-dom';


function App({props, location, history }) { 

  return ( 
    <> 
      <Router> 
        <Switch> 
        <> 
          <Route path='/sign' component={SignPage} /> 
          <Route path='/main' component={MainPage} /> 
          <Route path='/menupage' component={Menupage} /> 
          <Link to='/sign'>sign</Link>
          </> 
        </Switch> 
      </Router> 
    </> 
          ); }
export default App;

