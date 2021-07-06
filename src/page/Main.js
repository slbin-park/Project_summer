// eslint-disalbe

import React,{useState} from'react';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Main({history}) {
  const [login,setLogin] = useState({id: "",pwd: ""});
  const [job,setJob] = useState({value : "스태프"});

  
  const loginHandler = e =>{
    e.preventDefault();
    console.log(login);
    console.log(job);

    Axios.post('http://localhost:8000/api/insert', {
      title: login.id,
      content: login.pwd,
      job : job.value
    }).then(()=>{
      alert('등록 완료!');
      history.push('/sign');
    })
    
  }



  const handleChange = (event) =>{
    setJob({value: event.target.value});
    console.log(job);
  }

  return(
    <div className="container">
    <form  className="form-signin">
      <h2 className="form-signin-heading">회원가입 창</h2>
      <label htmlFor="inputEmail" className="sr-only">고 번</label>
      <input type="text" onChange ={e => setLogin({...login, id : e.target.value})} value ={login.id} id="inputEmail" className="form-control" placeholder="ID" required autoFocus/>
      <label htmlFor="inputPassword" className="sr-only">비밀번호</label>
      <input type="password" onChange ={e => setLogin({...login, pwd : e.target.value})} value ={login.pwd} id="inputPassword" className="form-control" placeholder="Password" required/>
      
    <div className="form-group">
        <label htmlFor="exampleSelect1" className="form-label mt-4">Example select</label>
        <select value={job.value} onChange={handleChange} name ="lifeArr" className="form-select" id="exampleSelect1">
          <option value="스태프">스태프</option>
          <option value="경찰">경찰</option>
          <option value="EMS">EMS</option>
      </select>
    </div>

      &nbsp;<br/>
      <button onClick={() => history.push('/main')} className="btn btn-primary" >   회원가입   </button>
      <button onClick={loginHandler} className="btn btn-primary" >   회원가입   </button>


      </form>

  </div>
  );
  
}

export default Main;