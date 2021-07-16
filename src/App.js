import React,{useState,useRef} from'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import SignPage from './page/Sign'; 
import MainPage from './page/Main';
import Menupage from './page/Menupage';
import Staff from './page/Staff';
import Police from './page/Police';
import Admin from './page/Admin';
import styled from "styled-components";



function App({props, location, history }) { 
  const [token,setToken] = useState(window.localStorage.getItem("token")); //토큰값 불러오기



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
          <Route path='/police' component={Police} /> 
          <Route path='/Admin' component={Admin} /> 
          </> 
        </Switch> 
      </Router> 
    </> 
          ); }
export default React.memo(App);

