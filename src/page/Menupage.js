// eslint-disalbe

import React,{useState,useRef} from'react';
import 'bootstrap/dist/css/bootstrap.css'
import Axios from'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainPage from './Main';
import {useLocation} from "react-router";
import 'moment/locale/ko';
import { useInterval } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

function MenuPage({location,history }) { 
    const id = location;
    //console.log(id.id.id);
    const [login,setLogin] = useState({id: "",pwd: ""});
    const [check,setCheck] = useState([]); //전체 데이터베이스 불러온것
    const [work,setWork] = useState([]);
    //시간불러옴

    const [seconds, setSeconds] = useState(Date.now());
    const [value,setvalue] = useState(1);

    // useInterval
    UseInterval(() => {
      setSeconds(Date.now());
    }, 1000);
    const nowTime = Date.now();
    // interval 30초
    //return <Moment interval = { 30000 }>{nowTime}</Moment>;
    // interval disable

    //데이터 가져오기
  useEffect(()=>{
    Axios.get('http://localhost:8000/api/get').then((response)=>{
        setCheck(response.data);
    });
    gettime();
  },[value],[work])

    const gettime = async function(){
    await Axios.post('http://localhost:8000/api/gettime', {
        title: id.id.id.id,
        date: seconds
    }).then((response)=>{
        if(response.data ==id.id.id.id)
        {
            console.log(response.data);
            setvalue(0);
           // alert("출근중입니다");
        }
        else{
        console.log(response.data);
        setWork(response.data);
        setvalue(1);
        }
    });
  }

  const starttime = () => {
    gettime();
    starttime2();
  }
  
  const starttime2 =async function(){
    if(value == 1)
    {
    console.log(work.length);
    await Axios.post('http://localhost:8000/api/insert2', {
      title: id.id.id.id,
      date: seconds,
      nickname : id.id.id.nickname
    }).then(()=>{
      alert('인서트 성공');
    })
  }
  else{
      alert("이미 출근중입니다.");
  }
  }

//퇴근
  const endtime = () => {
    endtime2();
};
     const endtime2 = async function(){
        await Axios.post('http://localhost:8000/api/update', {
            title: id.id.id.id,
            date: moment(seconds).format('MMMM Do YYYY, h:mm:ss a')
          }).then(()=>{
            alert('퇴근했습니다.');
            setvalue(1);
          })
    }




  return(
 <div className="d-grid gap-2">
     <h1>{id.id.id.id} 님 환영합니다.</h1>
     <h2>아이디 : {id.id.id.id}</h2>
     <h2>직업 : {id.id.id.job}</h2>
  <button className="btn btn-lg btn-primary" type="button" value="스태프">스태프</button>
  <button className="btn btn-lg btn-primary" type="button" value="경찰">경찰</button>
  <button className="btn btn-lg btn-primary" type="button" value="EMS">EMS</button>
    <Moment format="YYYY년 MM월 DD일 HH시 mm분 ss초" interval = { 0 }>
        {seconds}
    </Moment>
    <button onClick={starttime} className="btn btn-lg btn-primary" type="button">출근</button>
    <button onClick={endtime} className="btn btn-lg btn-primary" type="button">퇴근</button>
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