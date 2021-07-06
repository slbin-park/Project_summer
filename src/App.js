// eslint-disalbe

import React,{useState} from'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return(
    <div class="container">

    <form class="form-signin">
      <h2 class="form-signin-heading">로그인 창</h2>
      <label for="inputEmail" class="sr-only">고 번</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="ID" required autofocus/>
      <label for="inputPassword" class="sr-only">비밀번호</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
      <button class="btn btn-lg btn-primary btn-block" type="submit"> 로그인 </button>
      &nbsp;
      <button class="btn btn-lg btn-primary btn-block" type="submit"> 회원가입 </button>
      &nbsp;
      <button class="btn btn-lg btn-primary btn-block" type="submit"> 관리자 페이지 </button>
      </form>

  </div>
  );
  
}

export default App;