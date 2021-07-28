// eslint-disalbe

import React,{useState,useRef} from'react';
import 'bootstrap/dist/css/bootstrap.css'
import Axios from'axios';
import { useEffect } from 'react';
import 'moment/locale/ko';
import Moment from 'react-moment';
import styled from "styled-components";
import imgA from './img/VIP.png';
import Police from './img/Police.png';
import EMS from './img/EMS.png';
import Staff from './img/Staff.jpg';
import Logout from './img/logout.png';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


const Menus = styled.div`
justify-content: center;
text-align: center;
position: fixed;
display: flex;
justify-content: space-between;
bottom: 0;
width: 560px;
background-color: #efefef;
height: 120px;
left: 50%;
padding: 15px 30px;
padding-bottom: 10px;
transform: translateX(-50%);
border-top-left-radius: 25px;
border-top-right-radius: 25px;
`;

const ButtonStyle = styled.div`
justify-content: center;
text-align: center;
padding: 20px;
background-color: #fff;
border-radius: 10px;
transition: all 0.3s;
position: relative;
border: 2px solid #000;
color: #000;
&:hover {
  transform: scale(1.1);
}
span {
  position: absolute;
  bottom: 5%;
  left: 35%;
}
`;


function MenuPage({location,history }) { 
  
    const [id,setId] = useState(window.localStorage.getItem("id"))
    const [nickname,setNickname] = useState()
    const [job,setJob] = useState()
    const [totalworktime,settotalWorktime] = useState();
    //시간불러옴

    const [status,setStatus] = useState("퇴근");
    const [seconds, setSeconds] = useState(Date.now()); //시간 확인할려고 만들었음

    // useInterval
    UseInterval(() => {
      setSeconds(Date.now());
    }, 1000);
    const nowTime = Date.now();

  useEffect(async()=>{
      await Axios.post("https://qkrtmfqls.gabia.io/api/tokencheck", { //토큰 해석해서 출근,퇴근,아이디,닉네임,직업 불러옴
        token : window.localStorage.getItem("token")
     })
     .then((response)=>{
       setJob(response.data.job);
       setNickname(response.data.nickname);
     })
     .catch((error)=> {
      history.push({
        pathname: "/sign",
      })
       console.log(error);
     });
        getworktime();
      await Axios.post('https://qkrtmfqls.gabia.io/api/gettime', { //출근,퇴근 표시
              title: id,
              date: seconds
          }).then((response)=>{
              if(response.data ==id) //퇴근 안했음
              {
                //console.log("돌아온값 : ",response.data);
                  setStatus("출근");
              }
              else{
                  setStatus("퇴근");
              }
          });
    },[]);

  const getworktime = async function(){ //db에서 일한시간 합쳐서 
    await Axios.post('https://qkrtmfqls.gabia.io/api/getworktime', {
        title: id,
      }).then((response)=>{
          settotalWorktime(response.data[0].sumprice);
          //console.log(response.data[0].sumprice);
      })
}



    const staff = async function(){ //스태프페이지 이동
      if(job == '스태프' || job == '관리자'){
        alert('스태프 페이지 이동');//성공시에만 띄움
      history.push({
          pathname: "/staff",
        })
      }
      else {
        alert('스태프만 가능합니다.');
      }
  }


  const EMSopen = async function(){ //경찰페이지 이동
    if(job == 'EMS' || job == '관리자'){
      alert('EMS 페이지 이동');//성공시에만 띄움
    history.push({
        pathname: "/EMS",
      })
    }
    else {
      alert('EMS만 가능합니다.');
    }
}


  const police = async function(){ //경찰페이지 이동
    if(job == '경찰' || job == '관리자'){
      alert('경찰 페이지 이동');//성공시에만 띄움
    history.push({
        pathname: "/police",
      })
    }
    else {
      alert('경찰만 가능합니다.');
    }
}

const Admin = async function(){ //경찰페이지 이동
  if(job == '관리자'){
    alert('관리자 페이지 이동');//성공시에만 띄움
  history.push({
      pathname: "/Admin",
    })
  }
  else {
    alert('관리자만 가능합니다.');
  }
}

//로그아웃
const logout = async function(){
  alert('로그아웃 하셨습니다.');
  window.localStorage.clear();
  history.push({
    pathname: "/",
  });
}


const MenuButton = ({page,text})=>{
    return (
      <ButtonStyle onClick={page} >
        <img className="MENUVIP" src={text}></img>
      </ButtonStyle>
    );
}



//classname css수정시 . 사용해야함
  return(
 <div className="d-grid gap-2">
       <ProSidebar>
  <Menu iconShape="square">
    <MenuItem >Dashboard</MenuItem>
    <SubMenu title="Components" >
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
  </Menu>
</ProSidebar>
    <div id="gettt" className="alert alert-dismissible alert-warning">
      <h1 className="alert-heading">알림</h1>
        <p className="mb-0">{nickname} 님은 현재 <a href="#" className="alert-link">{status}
          </a> 상태입니다.
        </p>
    </div>
      <h2 className='h2line'>고유번호 : {id}</h2>
      <h2>직업 : {job}</h2>
      <Moment className='clock' format="YYYY년 MM월 DD일 HH시 mm분 ss초" interval = { 0 }>
        {seconds}
       </Moment>
    <Menus>
      <MenuButton page = {staff} text = {Staff} color = 'black' name ='user'/>
      <MenuButton page = {EMSopen}   text = {EMS} color = '#87BF00' name ='doctor'/>
      <MenuButton page = {police}  text = {Police} color = '#DE6800' name ='coffee'/>
      <MenuButton page = {Admin}text = {imgA} color = '#5CD3F3' name ='discord'/>
      <MenuButton page = {logout} text = {Logout} color = '#5CD3F3' name ='discord'/>
    </Menus>

    </div>
  );
}


function UseInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      // useEffect에 매개변수로 받은 콜백을 현재 Ref로 선언해준다.
      savedCallback.current = callback;
    });

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
        // useEffect에 Ref의 current를 setInterval를 delay 시간동안 해준다.
      let id = setInterval(tick, delay);
      // 언마운트되기전 clearInterval을 해준다.
      return () => clearInterval(id);
    }, [delay]);
  }

export default MenuPage;