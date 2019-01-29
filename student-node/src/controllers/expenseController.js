'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const fs = require("fs");

const db = require(path.join(__dirname, "../configs/database.js"));

const base = require(path.join(__dirname, "./baseController.js"));
const menuCtrl = require(path.join(__dirname, "./menuController.js"));

//班级列表界面
module.exports.expenseList = function (req, res, next) {

    let join = {
        "user": {
            on: [`user_id`, `user_id`]
        }
    };
    base.showList(req, res, menuCtrl, 'expense', join);
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
//班级添加界面
module.exports.expenseAdd = function (req, res) {
    getAllTeachar(function (result) {
        let obj = {
            template: path.join(__dirname, "../views/admin/expense/expense_add.html"),
            data: {
                result_list: result
            },
            res
        };
        base.assign(obj);
    });
};


//处理post数据
module.exports.expenseAddData = function (req, res) {

    var where = `expense_name = '${req.body.expense_name}'`;

    //先查询该班级是否存在
    db.table("expense").where(where).find().then(function (data) {
        //将对象转化为字符串
        if (JSON.stringify(data) != "{}") {
            res.setHeader("Content-Type", "text/html;charset=utf-8");
            res.end("<script>alert('该班级已经存在，请重新添加');location.href='/expense/expense_add';</script>");
            return false;
        } else {

            //封装数据部分
            var data = {
                "expense_name": req.body.expense_name,
                "expense_time": (Date.parse(moment(req.body.expense_time)) / 1000)
            };


            //插入数据库
            db.table('expense').add(data).then(function (insertId) {

                res.redirect('/expense/expense_list');
                return false;

            }).catch(function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }

    });


};


//班级编辑界面
module.exports.expenseEdit = function (req, res) {

    var expense_id = req.params.expense_id || 0;

    var where = `expense_id = ${expense_id}`;


    getAllTeachar(function (result) {
        let allTeachar;
        allTeachar = result;
        db.table("expense").join({
            user: {
                on: ["user_id", "user_id"]
            }
        }).where(where).find().then(function (data) {



            if (JSON.stringify(data) == "{}") {
                base.showMsg(res, "班级不存在", '/expense/expense_list');
                return false;
            } else {
                // console.log(data);
                //转化时间
                data.expense_time = moment(data.expense_time * 1000).format("YYYY-MM-DD");


                xtpl.renderFile(
                    path.join(__dirname, "../views/admin/expense/expense_edit.html"), {
                        expenseInfo: data,
                        allTeachar
                    },
                    function (err, content) {
                        res.setHeader("Content-Type", "text/html;charset=utf-8");
                        res.end(content);
                    }
                );
            }

        });
    });



};

//处理post数据 编辑班级
module.exports.expenseEditData = function (req, res) {
    var expense_id = req.params.expense_id || 0;

    var where = `expense_id = ${expense_id}`;

    db.table("expense").where(where).find().then(function (data) {

        if (JSON.stringify(data) == "{}") {
            base.showMsg(res, "班级不存在", '/expense/expense_list');
            return false;
        } else {
            var check = `expense_name = '${req.body.expense_name}' AND expense_id != ${expense_id}`;

            //先查询该班级是否存在
            db.table("expense").where(check).find().then(function (data) {
                //将对象转化为字符串
                if (JSON.stringify(data) != "{}") {
                    base.showMsg(res, "班级已存在");
                    return false;
                } else {


                    //封装数据部分
                    var data = {
                        "expense_name": req.body.expense_name,
                        "expense_time": (Date.parse(req.body.expense_time) / 1000),
                        "user_id": req.body.user_id
                    };



                    //更新数据库
                    db.table('expense').where(`expense_id = ${expense_id}`).update(data).then(function (affectRows) {

                        res.redirect('/expense/expense_list');
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
module.exports.expenseDelete = function (req, res) {
    let expense_id = req.params.expense_id || 0;
    base.deleteOne(res, expense_id, "expense", "expense_id", "/expense/expense_list");

};

module.exports.expenseDeleteAll = function (req, res) {

    let expense_id = req.body.expense_id;
    base.deleteALl(res, expense_id, "expense", "expense_id", "/expense/expense_list");

};