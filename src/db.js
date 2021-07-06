const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const PORT = process.env.port || 8000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "awd15963",
    database: "test2"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res)=>{
    const id = req.body.title;
    const pwd = req.body.content;
    const sqlQuery = "SELECT * FROM login;";
    db.query(sqlQuery, (err, result)=>{
        res.send(result );
    })
 })


app.post("/api/insert", (req, res) => {
    const id = req.body.title;
    const pwd = req.body.content;
    const job = req.body.job;
    const sqlQuery = "INSERT INTO login (id, pwd,job) VALUES (?,?,?)";
    db.query(sqlQuery, [id, pwd,job], (err, result) => {
        console.log("들어갔습니다.");
        res.send('success!');
    });
});

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});