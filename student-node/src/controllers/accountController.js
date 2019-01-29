'use strict';

/*
* 处理账号相关的业务逻辑
 */
const xtpl = require('xtpl');
const fs = require('fs');
const path = require('path');
const md5 = require("md5");

//引入数据库配置文件

const db = require(path.join(__dirname, '../configs/database.js'));

//加载验证码
const captchapng = require('captchapng');

//获取登录界面
module.exports.getLoginPage = function (req, res) {
    fs.readFile(path.join(__dirname, '../views/login.html'), function (err, data) {
        if (err) {
            console.log(err);
        }
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.end(data);
    });
};

//登录界面
module.exports.login = function (req, res) {
    const result = { status: 1, message: "登录成功" };

    //验证码验证
    if (req.session.vcode != req.body.vcode) {
        result.status = 2;
        result.message = "验证码错误";
        res.json(result);
        return;
    }

    var where = { admin_name: req.body.admin_name, admin_pwd: md5(req.body.admin_pwd) };

    db.table("admin").where(where).find().then(function (data) {
        if (!data) {
            result.status = 3;
            result.message = "用户名或是密码有误";
            res.json(result);
        } else {
            //记住登录信息
            req.session.admin_name = req.body.admin_name;
            res.json(result);
        }
    });
};

//获取验证码并返回图片

module.exports.getVcodeImage = function (req, res) {
    var vcode = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(80, 30, vcode);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    req.session.vcode = vcode;

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
};


//获取注册页面
module.exports.getRegisterPage = function (req, res) {
    fs.readFile(path.join(__dirname, "../views/register.html"), function (err, data) {
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.end(data);
    });
};


//注册用户
exports.register = function (req, res) {
    const result = { status: 1, message: "注册成功" };
    var admin_name = req.body.username;
    var admin_pwd = md5(req.body.password);
    var where = { admin_name: admin_name };

    db.table("admin").where(where).count("*").then(function (data) {
        if (data > 0) {
            result.status = 3;
            result.message = "用户名已存在";
            res.json(result);
        } else {
            const params = {
                admin_name: admin_name,
                admin_pwd: admin_pwd,
                admin_time: Date.now()
            };

            db.table('admin').add(params).then(function (insertId) {
                if (!insertId) {
                    result.status = 0;
                    result.message = "注册失败";
                }
                res.json(result);
            });
        }
    });

};

//获取账号列表
module.exports.accountList = function (req, res) {
    var sqldata = [
        'account_id ,account_account,r.role_name,u.user_name',
        'student_account as a inner join student_user as u on a.user_id = u.user_id inner join student_role as r on r.role_id = a.role_id '
    ];
    base.showListOfSql(req, res, menuCtrl, 'account', sqldata);

};




