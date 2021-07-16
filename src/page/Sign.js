// eslint-disalbe

import React,{useState} from'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Axios from'axios';
import { useEffect } from 'react';
import imgA from './img/VIP.png';


function Sign({props, location, history }) { 
  //로그인을 위한 것들
  const [login,setLogin] = useState({id: "",pwd: ""});
  const [token,setToken] = useState(window.localStorage.getItem("token")); //토큰값 불러오기


  useEffect(async()=>{
    localtoken();

},[]);

  const tokenlogin = () =>{
    Axios.post("https://qkrtmfqls.gabia.io/api/tokenlogin", {
    	 token : token,
       id : login.id,
       pwd : login.pwd
    })
    .then((response)=>{
      console.log(response.data);
      if(response.data.id == login.id)//로그인 성공시
      {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('id', login.id);
      console.log(window.localStorage.getItem("token"));
      history.push({
        pathname: "/Menupage",
      })
      }
      else{
        alert(response.data);//실패사유 출력
      }
    	//console.log(response.data);
    })
    .catch((error)=> {
    	console.log(error);
    });
  }


  //토큰 유효성 검사
  const localtoken = () =>{
    Axios.post("https://qkrtmfqls.gabia.io/api/tokencheck", {
    	 token : token
    })
    .then((response)=>{
      history.push({
        pathname: "/Menupage", //토큰이 유효하다면 메인 페이지로 넘어감
      })
    })
    .catch((error)=> {
      // if(error.response.data.code == 419) //error 떳을때 데이터 가져오기
      // {
      //   alert('로그인 세션이 만료되었습니다.');
      // }
    });
  }


  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormButton title="Log in"/>
   </div>
);

const FormButton = props => (
  <div id="button" class="row">
    <button onClick={tokenlogin} className="btn btn-lg btn-primary btn-block" type="submit"> 로그인 </button>
    <br/>
    <button onClick={() => history.push('/main')} className="btn btn-lg btn-primary btn-block" > 회원가입 </button>
  </div>
);

const FormInput = props => (
  <div class="row">

    <label>{props.description}</label>
    <input type="number" onChange ={e => setLogin({...login, id : e.target.value})} value ={login.id} id="inputEmail" placeholder="ID" required autoFocus/>
  </div>  
);
const FormInputpw = props => (
  <div class="row">

    <label>{props.description}</label>
    <input type="password" onChange ={e => setLogin({...login, pwd : e.target.value})} value ={login.pwd} id="inputPassword"  placeholder="Password" required/>
  </div>  
);

const OtherMethods = props => (
  <div id="alternativeLogin">
    <div id="iconGroup">  
      <Facebook/>
    </div>
  </div>
);

const Facebook = props => (
  <a href="#" id="facebookIcon"></a>
);


      return(
        <div id="loginform">
          
                <div id="iconGroup">  
                <img className="VIP" src={imgA}></img>
    </div>
    <div class="row">
  <input type="number" onChange ={e => setLogin({...login, id : e.target.value})} value ={login.id} id="inputEmail" placeholder="ID" required autoFocus/>
   <input type="password" onChange ={e => setLogin({...login, pwd : e.target.value})} value ={login.pwd} id="inputPassword"  placeholder="Password" required/>
    </div>  
          <Form />
          <OtherMethods />

        </div>

      );
  

  
  // return(
  //   <div className="container">
  //   <form  className="form-signin">
  //     <h2 className="form-signin-heading">로그인 창</h2>
  //     <label htmlFor="inputEmail" className="sr-only">고 번</label>
  //     <input type="text" onChange ={e => setLogin({...login, id : e.target.value})} value ={login.id} id="inputEmail" className="form-control" placeholder="ID" required autoFocus/>
  //     <label htmlFor="inputPassword" className="sr-only">비밀번호</label>
  //     <input type="password" onChange ={e => setLogin({...login, pwd : e.target.value})} value ={login.pwd} id="inputPassword" className="form-control" placeholder="Password" required/>
  //     <br></br>
  //     &nbsp;
  //     <button onClick={tokenlogin} className="btn btn-lg btn-primary btn-block" type="submit"> 토큰 로그인 </button>
  //     &nbsp;
  //     <button onClick={() => history.push('/main')} className="btn btn-lg btn-primary btn-block" > 회원가입 </button>
  //     &nbsp;
  //     <button onClick={localtoken} className="btn btn-lg btn-primary btn-block" type="submit"> 로컬 토큰 확인</button>
  //     </form>

  // </div>
  // );
}


export default Sign;