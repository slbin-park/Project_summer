// eslint-disalbe

import React,{useState} from'react';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from'axios';
import { useEffect } from 'react';

function Main({history}) {
  const [login,setLogin] = useState({id: "",pwd: "",nickname:""});
  const [job,setJob] = useState({value : "스태프"});

  const [check,setCheck] = useState({
    id : '',
    pwd : '',
    job : ''
  });

  useEffect(()=>{
    Axios.get('http://qkrtmfqls.gabia.io/api/get').then((response)=>{
        setCheck(response.data);
    })
  },[])
  //데이터 불러오기
  
  const loginHandler = e =>{
    if(login.id =='' || login.pwd =='' || login.nickname==''){
      alert('공백이 있습니다.');
    }
    else if(login.id.length <5)
    {
      alert('아이디 4자이상하셈');
    }
    else if(login.pwd.length <7){
      alert('비밀번호 6자이상 하셈');
    }
    else if(login.nickname.length <3){
      alert('닉네임 3글자이상 하셈');
    } else{
      e.preventDefault();
      console.log(check);
      const newcheck = [...check];
      const id = newcheck.find(id => id.id == login.id);
      if(id!=null){
          alert('중복된 아이디 입니다...');
      }
      else{
      Axios.post('http://qkrtmfqls.gabia.io/api/insert', {
        title: login.id,
        content: login.pwd,
        job : job.value,
        nickname : login.nickname
      }).then(()=>{
        alert('회원가입 성공!!');
        history.push('/sign');
      })
    }

    }
  }

  //회원가입 성공
  

  const logincheck = () => {
    const newcheck = [...check];
    const id = newcheck.find(id => id.id = login.id);
    if(id.id == login.id){
        alert('중복된 아이디 입니다.');
    }
    else{
        alert('로그인 실패..');
    }
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
      
      <label htmlFor="inputPassword" className="sr-only">닉네임</label>
      <input type="text" onChange ={e => setLogin({...login, nickname : e.target.value})} value ={login.nickname}  className="form-control" placeholder="Nickname" required/>
      
    <div className="form-group">
        <label htmlFor="exampleSelect1" className="form-label mt-4">직업 선택</label>
        <select value={job.value} onChange={handleChange} name ="lifeArr" className="form-select" id="exampleSelect1">
          <option value="스태프">스태프</option>
          <option value="경찰">경찰</option>
          <option value="EMS">EMS</option>
          <option value="시민">시민</option>
      </select>
    </div>

      &nbsp;<br/>
      <button onClick={loginHandler} className="btn btn-primary" >   회원가입   </button>


      </form>

  </div>
  );
  
}

export default Main;