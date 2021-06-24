var mysql = require('mysql');
const db = mysql.createPool({
    host : 'localhost',
    user : 'react_test',
    password : '1234',
    database : 'react_test'
});

module.exports = db;