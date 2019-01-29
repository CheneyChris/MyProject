'use strict';

/*
 * 处理账号相关的业务逻辑
 */
const xtpl = require('xtpl');
const fs = require('fs');
const path = require('path');
const md5 = require("md5");
var io = require('socket.io');

//引入数据库配置文件
const db = require(path.join(__dirname, '../configs/database.js'));

//测试版本
function test(req, res) {
    let name = Math.ceil(Math.random() * 10000);
    let loginuser = {
        id: name,
        name: "小明" + name,
        img: "/uploads/5GsJDFnlect_vJh_dU3Yh2FN.png"
    };
    let jsonstr = JSON.stringify(loginuser);

    res.cookie("loginUser", jsonstr, {
        maxAge: 1000 * 60 * 60 * 24
    });
    xtpl.renderFile(
        path.join(__dirname, "../views/admin/chatServer.html"), {

        },
        function (err, content) {
            res.setHeader("Content-Type", "text/html;charset=utf-8");
            res.end(content);
        }
    );
}

//正式版本
function golive(req, res) {
    let loginuser = req.session.admin;
    let where = `user_id = ${loginuser.user_id}`;
    db.table("user").where(where).find().then(result => {
        let loginuser = {};
        loginuser['id'] = result.user_id;
        loginuser['name'] = result.user_name;
        loginuser = JSON.stringify(loginuser);
        xtpl.renderFile(
            path.join(__dirname, "../views/admin/chatServer.html"), {
                loginuser
            },
            function (err, content) {
                res.setHeader("Content-Type", "text/html;charset=utf-8");
                res.end(content);
            }
        );
    }).catch(ex => {
        console.log(ex);
    });
}

function groupChat(req, res) {

    //测试版
    // test(req, res);

    //正式版
    golive(req, res);

}

//老写法，已废除
{
    // function priveteChat(req, res) {
    //     let user_id = req.params.user_id;
    //     let ispri = req.params.ispri;
    //     let target_id = req.params.target_id
    //     xtpl.renderFile(
    //         path.join(__dirname, "../views/admin/chatServer.html"), {
    //             user_id,
    //             ispri,
    //             target_id
    //         },
    //         function (err, content) {
    //             res.setHeader("Content-Type", "text/html;charset=utf-8");
    //             res.end(content);
    //         }
    //     );
    // }
    // module.exports.priveteChat = priveteChat
}

module.exports.groupChat = groupChat;