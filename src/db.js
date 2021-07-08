const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const PORT = process.env.port || 8000;
const moment = require('moment');

const db = mysql.createPool({
    host: "my8001.gabiadb.com",
    user: "vipadmin",
    password: "awdawd15963",
    database: "vipdb"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//login 데이터 가져오기
app.get("/api/get", (req, res)=>{
    const id = req.body.title;
    const pwd = req.body.content;
    const sqlQuery = "SELECT * FROM login;";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
        console.log(result);
    })
 })

//time데이터 가져오기
app.post("/api/gettime", (req, res)=>{
    const id = req.body.title;
    console.log(req.body);
    console.log("위에는 아이디입니다.");
    const sqlQuery = "SELECT * FROM time where id = (?) and work =0;";
    db.query(sqlQuery,[id],(err, result)=>{
        console.log(result.length);
        if(result.length > 0){
        res.send(id);
        console.log("퇴근 안함"); 
        }
        else{
        console.log("퇴근 했음");
        res.send(result);
        }
    })
 })

 //출근 확인하기
 app.post("/api/getwork", (req, res)=>{
    const id = req.body.title;
    console.log(req.body);
    console.log("위에는 아이디입니다.");
    const sqlQuery = "SELECT * FROM time where id = (?) and work =0;";
    db.query(sqlQuery,[id],(err, result)=>{
        if(result.length > 0){
            res.send(result);
            console.log("퇴근"); 
        }
            else{
            console.log("출근하지 않았습니다.");
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
        console.log(result);
    });
    db.query(sqlQuery, [id, pwd,job,nickname], (err, result) => {
        console.log("회원가입 성공.");
        console.log(result);
        res.send('success!');
    });
});


//시작시간 입력
app.post("/api/insert2", (req, res) => {
    console.log(req.body);
    const id = req.body.title;
    const nickname = req.body.nickname;
    const date = moment(req.body.date).format('MMMM Do YYYY, h:mm:ss a');
    console.log(date);

    const sqlQuery = "INSERT INTO time (id,start,nickname,work,end,worktime) VALUES (?,?,?,0,0,0)";

    const sqlQuery2= "SELECT * FROM time where id = (?) and work =0;";
    db.query(sqlQuery2,[id],(err, result)=>{
        console.log(result.length);
        if(result.length > 0){
        console.log("데이터 안보냄");
        res.send('send');
        }
        else{
            db.query(sqlQuery, [id, date,nickname], (err, result) => {
                console.log("출근했습니다.");
            })
        console.log("데이터 보냄");
        res.send(result);
        }
    })
;
});

//퇴근 하기
app.post("/api/update", (req, res) => {
    console.log(req.body);
    const id = req.body.title;
    const date = req.body.date;
    const worktime = req.body.worktime;
    console.log(date);
    const sqlQuery = "UPDATE time SET work = 1 ,end = (?),worktime= (?)  where id = (?) and work = 0;";
    db.query(sqlQuery, [date,worktime,id], (err, result) => {
        console.log("퇴근했습니다.");
        res.send('success!');
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