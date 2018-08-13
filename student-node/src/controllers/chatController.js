'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const fs = require("fs");

const db = require(path.join(__dirname, "../configs/database.js"));

const base = require(path.join(__dirname, "./baseController.js"));
const menuCtrl = require(path.join(__dirname, "./menuController.js"));


//列表界面
module.exports.chatList = function (req, res, next) {
    var sqldata = [
        'u.user_name as user_name,f.user_name as firend_name,c.chat_id,c.other_id,c.chat_time',
        'student_user as u inner join student_chat as c on u.user_id = c.user_id inner join student_user as f on c.other_id = f.user_id'
    ]   
    base.showListOfSql(req, res, menuCtrl, 'chat','c',sqldata);
};
//获取全部老师数据
function getAllTeachar(func) {
    let where = "usertype_id = 2";
    db.table("user").where(where).select().then(function (result) {
        func(result);
    }).catch(function (info) {
        console.log(info);
    });
}
//添加界面
module.exports.chatAdd = function (req, res) {
    getAllTeachar(function (result) {
        let obj = {
            template: path.join(__dirname, "../views/admin/chat/chat_add.html"),
            data: {
                result_list: result
            },
            res
        }
        base.assign(obj);
    });
};

//处理post数据
module.exports.chatAddData = function (req, res) {

    var where = `chat_name = '${req.body.chat_name}'`;

    //先查询该是否存在
    db.table("chat").where(where).find().then(function (data) {
        //将对象转化为字符串
        if (JSON.stringify(data) != "{}") {
            res.setHeader("Content-Type", "text/html;charset=utf-8");
            res.end("<script>alert('该已经存在，请重新添加');location.href='/chat/chat_add';</script>");
            return false;
        } else {

            //封装数据部分
            var data = {
                "chat_name": req.body.chat_name,
                "chat_time": (Date.parse(moment(req.body.chat_time)) / 1000)
            };


            //插入数据库
            db.table('chat').add(data).then(function (insertId) {

                res.redirect('/chat/chat_list');
                return false;

            }).catch(function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }

    });
};


//编辑界面
module.exports.chatEdit = function (req, res) {
    base.tableEdit(req, res,"chat");
};

//处理post数据 编辑
module.exports.chatEditData = function (req, res) {
    var chat_id = req.params.chat_id || 0;

    var where = `chat_id = ${chat_id}`;

    db.table("chat").where(where).find().then(function (data) {

        if (JSON.stringify(data) == "{}") {
            base.showMsg(res, "不存在", '/chat/chat_list');
            return false;
        } else {
            var check = `chat_name = '${req.body.chat_name}' AND chat_id != ${chat_id}`;

            //先查询该是否存在
            db.table("chat").where(check).find().then(function (data) {
                //将对象转化为字符串
                if (JSON.stringify(data) != "{}") {
                    base.showMsg(res, "已存在");
                    return false;
                } else {


                    //封装数据部分
                    var data = {
                        "chat_name": req.body.chat_name,
                        "chat_time": (Date.parse(req.body.chat_time) / 1000),
                        "user_id": req.body.user_id
                    };



                    //更新数据库
                    db.table('chat').where(`chat_id = ${chat_id}`).update(data).then(function (affectRows) {

                        res.redirect('/chat/chat_list');
                        return false;

                    }).catch(function (err) {
                        if (err) {
                            base.showMsg(res, '更新失败');
                            console.log(err);
                            return false;
                        }
                    });
                }

            });


        }

    });

};
//单表删除方法
function deleteFunc(table, where, msg = "", errmsg = "") {

    db.table(table).where(where).delete().than(function (effectrow) {

        if (effectrow > 0) {
            base.showMsg(res, msg);
        }
    }).catch(function (err) {
        throw new Exception(errmsg)
    })
}
//删除方法
module.exports.chatDelete = function (req, res) {

    var chat_id = req.params.chat_id || 0; //获取删除单个id
    let chat_ids = req.body.chat_id || 0; //获取删除多个id
    chat_ids = chat_ids.join(","); //数组转换字符串

    //判断是批量删除还是单个删除
    var where = chat_ids != 0 ? `chat_id in (${chat_ids}) and usertype_id = 1` : `chat_id = ${chat_id} and usertype_id = 1`
    var delchatWhere = chat_ids != 0 ? `chat_id in (${chat_ids})` : `chat_id = ${chat_id}`

    //拿到指定的所有学生信息
    db.table('userofchat').join({
        user: {
            on: ["user_id", "user_id"]
        }
    }).where(where).getField("student_user.user_id").then(function (data) {

        //拿到该下所有的学生
        let str = data.join(",");
        //删除学生图片
        db.table("user").where(`user_id IN(${str}) and usertype_id = 1`).select().then(function (result) {

            result.forEach(item => {
                fs.unlink("./assets/uploads/", function (err) {
                    if (err) {
                        throw new Exception("文件删除失败:" + err)
                    }

                });
            });
            deleteFunc("chat", delchatWhere, "删除成功", "删除信息出错");
        }).catch();
        //删除学生账号
        // deleteFunc("account",`user_id IN(${str})`,"删除学生账号成功","删除学生账号信息出错");
        // //删除学生钱包
        // deleteFunc("money",`user_id IN(${str})`,"删除学生钱包成功","删除学生钱包信息出错");
        // //删除学生反馈
        // deleteFunc("feedback",`user_id IN(${str})`,"删除学生反馈成功","删除学生反馈信息出错");
        // //删除学生所属关系删除
        // deleteFunc("userofchat",`user_id IN(${str})`,"删除学生关系成功","删除学生关系信息出错");
        //如果下面没有学生的话  就直接删除


    });
};