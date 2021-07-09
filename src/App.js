import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import SignPage from './page/Sign'; 
import MainPage from './page/Main';
import Menupage from './page/Menupage';
import Staff from './page/Staff';
import {Link } from 'react-router-dom';


function App({props, location, history }) { 

  return ( 
    <> 
      <Router> 
        <Switch> 
        <> 
        <Route exact path='/' component={SignPage} /> 
          <Route path='/sign' component={SignPage} /> 
          <Route path='/main' component={MainPage} /> 
          <Route path='/menupage' component={Menupage} /> 
          <Route path='/staff' component={Staff} /> 
          </> 
        </Switch> 
      </Router> 
    </> 
          ); }
export default App;

