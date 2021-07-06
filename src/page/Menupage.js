// eslint-disalbe

import React,{useState} from'react';
import 'bootstrap/dist/css/bootstrap.css'
import Axios from'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainPage from './Main';
import {useLocation} from "react-router";

function MenuPage({location,history }) { 



    const id = location;
    console.log(id.id.id.id);
  const [login,setLogin] = useState({id: "",pwd: ""});
  const [check,setCheck] = useState([]); //전체 데이터베이스 불러온것




  useEffect(()=>{
    Axios.get('http://localhost:8000/api/get').then((response)=>{
        setCheck(response.data);
    })
  },[])

  const logincheck = () => {
    const newcheck = [...check];
    const id = newcheck.find(id => id.id = login.id);
    console.log(id);
    if(id.id == login.id && id.pwd == login.pwd){
        alert('로그인 성공');
        this.props.history.push('/mainpage}')
    }
    else{
        alert('로그인 실패..');
    }
    // setCheckid();
    // if(checkid.id == login.id && checkid.pwd == login.pwd)
    // {
    //     console.log('로그인 성공');
    // }

  }

  return(
 <div className="d-grid gap-2">
     <h1>{id.id.id.id} 님 환영합니다.</h1>
     <h2>아이디 : {id.id.id.id}</h2>
     <h2>직업 : {id.id.id.job}</h2>
  <button className="btn btn-lg btn-primary" type="button" value="스태프">스태프</button>
  <button className="btn btn-lg btn-primary" type="button" value="경찰">경찰</button>
  <button className="btn btn-lg btn-primary" type="button" value="EMS">EMS</button>
    </div>
  );
  
}

export default MenuPage;