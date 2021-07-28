// eslint-disalbe

import React,{useState,useRef} from'react';
import 'bootstrap/dist/css/bootstrap.css'
import Axios from'axios';
import { useEffect } from 'react';
import 'moment/locale/ko';
import Moment from 'react-moment';
import moment from 'moment';


function MenuPage({location,history }) { 
  
    const [id,setId] = useState(window.localStorage.getItem("id"))
    const [nickname,setNickname] = useState(window.localStorage.getItem("id"))
    const [job,setJob] = useState(window.localStorage.getItem("id"))
    const [work,setWork] = useState([]);
    const [worktime,setWorktime] = useState([]);
    const [totalworktime,settotalWorktime] = useState();
    const [value,setValue] = useState(0);
    const [staff,setStaff] = useState();
    const [register,setRegister] = useState();
    let stafflet = [];
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
    getstaff();
    await Axios.post("https://qkrtmfqls.gabia.io/api/tokencheck", {
      token : window.localStorage.getItem("token")
   })
   .then((response)=>{
     setJob(response.data.job);
     setNickname(response.data.nickname);
     //console.log('아이디 : ',id);
   })
   .catch((error)=> {
    if(error.response.data.code == 419) //error 떳을때 데이터 가져오기
    {
      alert('로그인 세션이 만료되었습니다.');
      history.push({
        pathname: "/sign",
      })
    }
   });
        getworktime();
        await Axios.post('https://qkrtmfqls.gabia.io/api/gettime', {
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





  //출근버튼 누르면 실행하는 함수

  const starttime = () => {
    gettime();//출근버튼 
  }

  const gettime = async function(){
    await Axios.post('https://qkrtmfqls.gabia.io/api/gettime', {
        title: id,
        date: seconds,
        nickname : nickname
    }).then((response)=>{
        if(response.data ==id) //퇴근 안했음
        {
            alert("이미 출근하셨습니다.");
            setStatus("출근");
        }
        else{
            starttime2(); //출근 안했으니 insert구문으로 db에 데이터 넣어줌
            setStatus("출근");
        }
    });
  }

  useEffect(()=>{
    //console.log("status 값",status);
  },[status])


  const starttime2 =async function(){
    try{
    await Axios.post('https://qkrtmfqls.gabia.io/api/insert2', {
      title: id,
      date: seconds,
      nickname : nickname,
      job : job
    }).then((response)=>{
      alert('출근 성공');
    })
}catch(e){
    console.log("출근에러 : ",e);
}
  }
  







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

  //worktime 값이 변했을때
  useEffect(()=>{
      if(value==1){
    endtime2();
      }
  },[worktime])

  //시간계산
  const checktime = () =>{
    try{
  var time1 = moment(work.work,'MMMM Do YYYY, h:mm:ss a');
  var time2 = moment(seconds); 
  var duration = moment.duration(time2.diff(time1)).asMinutes();
  setWorktime(duration);
  //var time3 = moment.duration(time1.diff(time2)).asMinutes();
    //seconds -> 현재시간
    }catch(e){
        console.log(e);
    }

}

    const endtime2 = async function(){
        await Axios.post('https://qkrtmfqls.gabia.io/api/update', {
            title: id,
            date: moment(seconds).format('yyyy-MM-dd HH:mm:ss'),
            worktime : worktime
          }).then(()=>{
            setValue(0);
            getworktime();
            alert('퇴근했습니다.');
            setStatus("퇴근");
          })
    }

    const getstaff = async ()=>{
      Axios.post('https://qkrtmfqls.gabia.io/api/getstaff', {//데이터 불러옴
    }).then((response)=>{
      stafflet = response.data;
      setStaff(response.data);
    });
    }

    const Pushstaff = ({workstaff}) =>{
      let workstate = workstaff.work ==0? '출근':'퇴근';
      return(
     <tr className="table-active">
         <th scope="row">{workstaff.id}</th>
         <td>{workstaff.job}</td>
         <td>{workstaff.nickname}</td>
         <td>{workstaff.start}</td>
         <td>{workstate}</td>
     </tr>
      )
    }





    const Testpuch =  () =>{
      const rows = [];
      if(staff !=null){
       staff.forEach(
            (staffrow) => {
              rows.push(<Pushstaff workstaff = {staffrow} key = {staffrow.id}></Pushstaff>)
       });
      }
    return(
      <table className="table table-hover"> 
      <thead>
       <tr>
        <th scope="col">고유번호</th>
        <th scope="col">직업</th>
        <th scope="col">닉네임</th>
        <th scope="col">시작시간</th>
        <th scope="col">상태</th>
        </tr>
      </thead>
         <tbody>
           {rows}
         </tbody>
       </table>
    )

    }


  return(
 <div className="d-grid gap-2">
    <h1>EMS 페이지 입니다.</h1>

    <div className="alert alert-dismissible alert-warning">
  <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
  <div className="stafflogin">
  <h2 className="alert-heading">알림</h2>
  <p className="mb-0">{nickname} 님은 현재 <a href="#" className="alert-link">{status}</a> 상태입니다.</p>
  <h2>고유번호 : {id}</h2>
    <h2>직업 : {job}</h2>
  </div>
</div>
    <h2>  
    <Moment format="YYYY년 MM월 DD일 HH시 mm분 ss초" interval = { 0 }>
        {seconds}
    </Moment>
    <h1>근무시간 : {parseInt(Number(totalworktime)/60) } 시간 {parseInt(Number(totalworktime))%60 } 분</h1>
    </h2>
    <div className="staffbutton" >
    <button className="staffbutton2"  onClick={starttime} type="button">출근</button>
    <button className="staffbutton2"  onClick={endtime}  type="button">퇴근</button>

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

export default MenuPage;