const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');//로그인토큰
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const moment = require('moment');
const cookies = require('cookie');
require("dotenv").config();


const db = mysql.createPool({
    host: "my8001.gabiadb.com",
    user: "vipadmin",
    password: "awdawd15963",
    database: "vipdb"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './build')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./build/index.html"));
  });

// app.get('/', (req, res) => {
//     const id = req.body.title;
//     const pwd = req.body.content;
//     const sqlQuery = "SELECT * FROM login;";
//     db.query(sqlQuery, (err, result)=>{
//         res.send(result);
//         //console.log(result);
//     })
//   })
  

//id 중복확인
app.post("/api/getid", (req, res)=>{ 
    const id = req.body.id;
    const sqlQuery = "SELECT * FROM login where id=(?);";
    db.query(sqlQuery,[id], (err, result)=>{
        if(result.length > 0)
        {
            res.send("중복");
        }
        else{
            res.send("성공");
        }
    })
 })


//login 데이터 가져오기
app.post("/api/getdata", (req, res)=>{
    const sqlQuery = "SELECT * FROM login;";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    })
 })

 //staff데이터 가져오기
 app.post("/api/getstaff", (req, res)=>{
    const sqlQuery = "SELECT * FROM time where work=0 ;";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    })
 })

  //staff데이터 가져오기
app.post("/api/getregister", (req, res)=>{
    const sqlQuery = "SELECT * FROM login where register='0';";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    })
 })


 app.post("/api/setregister", (req, res)=>{
    const id = req.body.id;
    const sqlQuery = "UPDATE login SET register = 1 where id = (?);";
    db.query(sqlQuery,[id], (err, result)=>{
        res.send('');
    })
 })

//time데이터 가져오기
app.post("/api/gettime", (req, res)=>{
    const id = req.body.title;
    const sqlQuery = "SELECT * FROM time where id = (?) and work =0;";
    db.query(sqlQuery,[id],(err, result)=>{
        if(result.length > 0){
        res.send(id);
        }
        else{
        res.send(result);
        }
    })
 })

 //토큰생성
 const generateAccessToken = (id,nickname,job) => {
    return jwt.sign({ id,nickname,job }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m", // 토큰 유효시간 10분임
    });
};

//로그인 버튼 누를시 성공시 토큰 생성해서 토큰 , id값 반환
app.post("/api/tokenlogin", (req, res) => {
    try{
    let id = req.body.id;
    let pwd = req.body.pwd;
    //로그인 체킹 하는거
    const logincheck = "SELECT * FROM login where id = (?);";//사용자와 일치하는지
    //밑에도 비동기로 실행됨..
    db.query(logincheck,[id],(err, result)=>{
        if(result.length<1){
            res.send('없는 아이디 입니다.');
        } 
        else if (result[0].register ==0){
            res.send('승인이 필요합니다');
        }
        else if(result[0].id == id && result[0].pwd == pwd){
            let accessToken = generateAccessToken(id,result[0].nickname,result[0].job);
            res.send({accessToken,id});
        }
        else{
            res.send('비밀번호가 틀렸습니다.');
        }
    });
    }catch(error){
    return res.status(419).send({
        code: 419,
        message: '로그인 에러'
      });
    }
});

//토큰 디코딩 하는거
app.post("/api/tokencheck", (req, res , next) => {
    try {
        // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰 반환
        res.send(jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET));
        return next();
      }
    
      // 인증 실패
      catch (error) {
        console.log(error.name);
        // 유효기간이 초과된 경우
        if (error.name === 'TokenExpiredError') {

          return res.status(419).send({
            code: 419,
            message: '토큰이 만료되었습니다.'
          });
        }
    
        // 토큰의 비밀키가 일치하지 않는 경우
        return res.status(401).json({
          code: 401,
          message: '유효하지 않은 토큰입니다.'
        });
      }
});





 //로그인 기능
 app.post("/api/gettoken", (req, res)=>{
     try{
    const id = req.body.title;
    const pwd = req.body.content;
    const logincheck = "SELECT * FROM login where id = (?);";//사용자와 일치하는지
    let accessToken = generateAccessToken(id);

    db.query(logincheck,[id],(err, result)=>{
        if(result == null)
        {
            res.send('실패');
        }
        else if(result[0].id == id , result[0].pwd == pwd){
            res.send(result);

            res.json({ accessToken});//토큰보내기

        }
        else{
            res.send('실패');
        }
    });
}catch(error){
    return res.status(419).send({
        code: 419,
        message: '토큰 에러'
      });
}
 })

 //출근 확인하기
 app.post("/api/getwork", (req, res)=>{
    const id = req.body.title;
    const sqlQuery = "SELECT * FROM time where id = (?) and work =0;";
    db.query(sqlQuery,[id],(err, result)=>{
        if(result.length > 0){
            res.send(result);
        }
            else{
            res.send(id);
            }
    })
 })


//회원가입
app.post("/api/insert", (req, res) => {
    const id = req.body.title;
    const pwd = req.body.content;
    const job = req.body.job;
    const nickname = req.body.nickname;
    const sqlQuery = "INSERT INTO login (id, pwd,job,nickname) VALUES (?,?,?,?)";
    const sqlQuery2 = "SELECT * FROM time;";
    db.query(sqlQuery2, [id, pwd,job,nickname], (err, result) => {
    });
    db.query(sqlQuery, [id, pwd,job,nickname], (err, result) => {
        res.send('success!');
    });
});


//출근하기 버튼 
app.post("/api/insert2", (req, res) => {
    const id = req.body.title;
    const nickname = req.body.nickname;
    const date = moment(req.body.date).format('MMMM Do YYYY, h:mm:ss a');
    const job = req.body.job;

    const sqlQuery2= "SELECT * FROM time where id = (?) and work =0;";

    db.query(sqlQuery2,[id],(err, result)=>{
        if(result.length > 0){
        res.send('send');
        }
        else{
            const sqlQuery = "INSERT INTO time (id,start,nickname,work,end,worktime,job) VALUES (?,?,?,0,0,0,?)";
            db.query(sqlQuery,[id,date,nickname,job],(err, result)=>{
                res.send(result);
                const sqlQuery4 = "UPDATE login SET work= 0  where id = (?);"; //계산값 퇴근표시 
                db.query(sqlQuery4,[id],(err, result)=>{
                })
            });
 
        }
    });
;
});

//퇴근 하기
app.post("/api/update", (req, res) => {
    const id = req.body.title;
    const date = req.body.date;
    const worktime = req.body.worktime;
    const sqlQuery = "UPDATE time SET work = 1 ,end = (?),worktime= (?)  where id = (?) and work = 0;";
    db.query(sqlQuery, [date,worktime,id], (err, result) => {
        const sqlQuery2 = "SELECT SUM(worktime) sumprice FROM time where id = (?) and work =1;"; //총합값 계산
        db.query(sqlQuery2,[id],(err, result)=>{
            const a = result[0].sumprice;
            const sqlQuery3 = "UPDATE login SET totaltime= (?)  where id = (?);"; //계산값 login에 삽입
            db.query(sqlQuery3,[a,id],(err, result)=>{
                const sqlQuery4 = "UPDATE login SET work= 1  where id = (?);"; //계산값 퇴근표시 
                db.query(sqlQuery4,[id],(err, result)=>{
                    res.send('success!');
                })
            })
        })
    });
});

 //시간 확인하기
 app.post("/api/getworktime", (req, res)=>{
    const id = req.body.title;
    
    const sqlQuery = "SELECT SUM(worktime) sumprice FROM time where id = (?) and work =1;";
    db.query(sqlQuery,[id],(err, result)=>{
        res.send(result);
    })
 })


app.listen(PORT, ()=>{
    console.log(`running on port ${PORT} 서버가 정상작동했습니다.`);
});