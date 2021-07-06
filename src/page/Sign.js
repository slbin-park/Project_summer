// eslint-disalbe

import React,{useState} from'react';
import 'bootstrap/dist/css/bootstrap.css'
import Axios from'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainPage from './Main';

function Sign({props, location, history }) { 
  //로그인을 위한 것들
//   const mongoose = require('mongoose')
//   mongoose.connect('mongodb+srv://slbin:awd15963@cluster0.mywlh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
//   useNewUrlParser : true,useUnifiedTopology : true, useCreateIndex:true , useFindAndModify : false
// }).then(() => console.log("연결 성공"))
//   .catch(err => console.log("연결실패"));
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
    if(id.id == login.id && id.pwd == login.pwd){
        alert('로그인 성공');
        history.push({
            pathname: "/Menupage",
            id : {id :  id} 
          })
    }
    else{
        alert('로그인 실패..');
    }
  }

  return(
    <div className="container">
    <form  className="form-signin">
      <h2 className="form-signin-heading">로그인 창</h2>
      <label htmlFor="inputEmail" className="sr-only">고 번</label>
      <input type="text" onChange ={e => setLogin({...login, id : e.target.value})} value ={login.id} id="inputEmail" className="form-control" placeholder="ID" required autoFocus/>
      <label htmlFor="inputPassword" className="sr-only">비밀번호</label>
      <input type="password" onChange ={e => setLogin({...login, pwd : e.target.value})} value ={login.pwd} id="inputPassword" className="form-control" placeholder="Password" required/>
      <br></br>
      <button onClick={logincheck} className="btn btn-lg btn-primary btn-block" type="submit"> 로그인 </button>
      &nbsp;
      <button onClick={() => history.push('/main')} className="btn btn-lg btn-primary btn-block" > 회원가입 </button>
      &nbsp;
      </form>

  </div>
  );
  
}

export default Sign;