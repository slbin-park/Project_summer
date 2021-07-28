// eslint-disalbe

import React,{useState,useRef} from'react';
import 'bootstrap/dist/css/bootstrap.css'
import Axios from'axios';
import { useEffect } from 'react';
import 'moment/locale/ko';
import Moment from 'react-moment';
import moment from 'moment';
import { Button, Segment } from 'semantic-ui-react'

function Admin({location,history }) { 
  
    const [id,setId] = useState(window.localStorage.getItem("id"))
    const [nickname,setNickname] = useState(window.localStorage.getItem("id"))
    const [job,setJob] = useState(window.localStorage.getItem("id"))
    const [work,setWork] = useState([]);
    const [worktime,setWorktime] = useState([]);
    const [totalworktime,settotalWorktime] = useState();
    const [value,setValue] = useState(0);
    const [register,setRegister] = useState();
    const [userdata,setUser] =useState();
    var [showpost,setshowpost] = useState(0);
    //시간불러옴

    const [status,setStatus] = useState("퇴근");
    const [seconds, setSeconds] = useState(Date.now()); //시간 확인할려고 만들었음

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
  },[totalworktime])

  

  useEffect(async()=>{
  //   getuser();
  //   getregister();
  //   await Axios.post("https://qkrtmfqls.gabia.io/api/tokencheck", {
  //     token : window.localStorage.getItem("token")
  //  })
  //  .then((response)=>{
  //    setJob(response.data.job);
  //    setNickname(response.data.nickname);
  //  })
  //  .catch((error)=> {
  //   if(error.response.data.code == 419) //error 떳을때 데이터 가져오기
  //   {
  //     alert('로그인 세션이 만료되었습니다.');
  //     history.push({
  //       pathname: "/sign",
  //     })
  //   }
  //  });
        getworktime();
        await Axios.post('https://qkrtmfqls.gabia.io/api/gettime', {
            title: id,
            date: seconds
        }).then((response)=>{
            if(response.data ==id) //퇴근 안했음
            {
                setStatus("출근");
            }
            else{
                setStatus("퇴근");
            }
        });
  },[]);

  







//총합시간계산
  const getworktime = async function(){
    await Axios.post('https://qkrtmfqls.gabia.io/api/getworktime', {
        title: id,
      }).then((response)=>{
          settotalWorktime(response.data[0].sumprice);
      })
}


//퇴근
  const endtime = () => {
    try{
        getwork();
    }catch(e){
        console.log(e);
    }

};

//work에 시작시간 테이블 가져오기
const getwork = async function(){
    const response = await Axios.post('https://qkrtmfqls.gabia.io/api/getwork', {
        title: id
      });
      if(response.data ==id) //퇴근 안했음
      {
          alert("출근하지 않으셨습니다.");
      }
      else{
        var time = response.data[0].start;
        setValue(1);
        UpdateWork(time);
        //checktime();
      }

  }
  const UpdateWork= (time)=>{
    setWork((state,props)=>{
        return {work : time}
    });
  }
  //work값이 변경됬을때 실행
  useEffect(()=>{
    checktime();//work값이 변경되었을때 실행함
  },[work])


  //시간계산
  const checktime = () =>{
    try{
  var time1 = moment(work.work,'MMMM Do YYYY, h:mm:ss a');
  var time2 = moment(seconds); 
  var duration = moment.duration(time2.diff(time1)).asMinutes();
  setWorktime(duration);
    }catch(e){
        console.log(e);
    }
}


const getuser = async (text) =>{
  await Axios.post('https://qkrtmfqls.gabia.io/api/getdata', {//유저 전체 데이터 불러옴
}).then((response)=>{
  setUser(response.data);
});
}

    const staffend = async (text) =>{
      await Axios.post('https://qkrtmfqls.gabia.io/api/setregister', {//승인 버튼
      id : text
    }).then((response)=>{
      getregister();
      alert('승인완료 ');
    });
    }

    const getregister = async ()=>{
      await Axios.post('https://qkrtmfqls.gabia.io/api/getregister', {//승인받아야하는 회원
    }).then((response)=>{
      setRegister(response.data);
    });
    }

    const Testpuch =  () =>{
      const rows = [];

      if(showpost == 1){ // 전체유저
        if(userdata !=null){
        userdata.forEach(
            (staffrow) => {
              //rows.push(<Pushstaff register = {staffrow} key = {staffrow.id}></Pushstaff>)
              rows.push(<Pushuser user = {staffrow} key = {staffrow.id}></Pushuser>)
       });
        }

    return(
      <table className="table table-hover"> 
      <thead>
       <tr>
        <th scope="col">고유번호</th>
        <th scope="col">직업</th>
        <th scope="col">닉네임</th>
        <th scope="col">출근상태</th>
        <th scope="col">근무시간</th>
        </tr>
      </thead>
         <tbody>
           {rows}
         </tbody>
       </table>
    )
      }
      else{ //승인해야할 유저들
              if(register !=null){
        register.forEach(
            (staffrow) => { //data key 음식 제목?정도로 하면 되지않을까
              rows.push(<Pushstaff register = {staffrow} key = {staffrow.id}></Pushstaff>)
       });
      }
        return(
          <table className="table table-hover"> 
          <thead>
           <tr>
            <th scope="col">고유번호</th>
            <th scope="col">직업</th>
            <th scope="col">닉네임</th>
            <th scope="col">승인상태</th>
            <th scope="col">승인</th>
            </tr>
          </thead>
             <tbody>
               {rows}
             </tbody>
           </table>
        );
      }

    }

    //승인 버튼
    const Pushstaff = ({register}) =>{
      let check = register.register ==0? '미승인':'승인';
      return(
     <tr className="table-active">
         <th scope="row">{register.id}</th>
         <td>{register.job}</td>
         <td>{register.nickname}</td>
         <td>{check}</td>
         <td><button onClick={() => staffend(register.id)} type="button"  className="buttonstaff">승인</button></td>
     </tr>
      )
    }

    //전체회원
    const Pushuser = ({user}) =>{
      
      let check = user.work ==0? '출근':'퇴근';
      return(
     <tr className="table-active">
         <th scope="row">{user.id}</th>
         <td>{user.job}</td>
         <td>{user.nickname}</td>
         <td>{check}</td>
         <td>{parseInt(Number(user.totaltime)/60) } 시간 {parseInt(Number(user.totaltime))%60 }분</td>
     </tr>
      )
    }
    const Pushregister = () => {
      setshowpost(0);
    }
    const Pushusr = () =>{
      setshowpost(1);
    }


  return(
 <div className="d-grid gap-2">
    <h1> 관리자 페이지 입니다.</h1>
    <h2>
    <Moment format="YYYY년 MM월 DD일 HH시 mm분 ss초" interval = { 0 }>
        {seconds}
    </Moment>
    </h2>
    <div className="alert alert-dismissible alert-warning">
  <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
  <div className="stafflogin">
  <h2>고유번호 : {id}</h2>
    <h2>직업 : {job}</h2>
  </div>
</div>

    <div className="staffbutton" >
    <button className="staffbutton2"  onClick={Pushregister}  type="button">승인</button>
    <button className="staffbutton2"  onClick={Pushusr}  type="button">전체회원</button>
    </div>
    <br></br>
    <Testpuch/>

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

export default Admin;