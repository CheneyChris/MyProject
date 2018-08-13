/*
    数据库操作模块
 */

const Mysql = require('node-mysql-promise');
const db = Mysql.createConnection({
	host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'student',
    tablePrefix:'student_'
});


module.exports = db;



