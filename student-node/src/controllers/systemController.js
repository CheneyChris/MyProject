'use strict';

const fs = require('fs');
const path = require('path');
const md5 = require('md5');


//加载数据库文件
const db = require(path.join(__dirname,'../config/database.js'));

//验证码
const captchapng = require('captchapng');


module.exports.index = function(req,res)
{
    fs.readFile(path.join(__dirname,'../views/admin-index.html'),function(err,data){
        if(err)
        {
            console.log(err);
        }
        res.setHeader("Content-Type","text/html;charset=utf-8");
        res.end(data);
    });
};