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
module.exports.orderformList = function (req, res, next) {

    var sqldata = [
        'orderform_id ,orderform_time,us.user_name,cur.curriculum_name',
        'student_orderform as ord inner join student_user as us on ord.user_id = us.user_id inner join student_curriculum as cur on ord.curriculum_id = cur.curriculum_id'
    ]   
    base.showListOfSql(req, res, menuCtrl, 'orderform','ord',sqldata);
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
module.exports.orderformAdd = function (req, res) {
    getAllTeachar(function (result) {
        let obj = {
            template: path.join(__dirname, "../views/admin/orderform/orderform_add.html"),
            data: {
                result_list: result
            },
            res
        }
        base.assign(obj);
    });
};


//处理post数据
module.exports.orderformAddData = function (req, res) {

    var where = `orderform_name = '${req.body.orderform_name}'`;

    //先查询该班级是否存在
    db.table("orderform").where(where).find().then(function (data) {
        //将对象转化为字符串
        if (JSON.stringify(data) != "{}") {
            res.setHeader("Content-Type", "text/html;charset=utf-8");
            res.end("<script>alert('该班级已经存在，请重新添加');location.href='/orderform/orderform_add';</script>");
            return false;
        } else {

            //封装数据部分
            var data = {
                "orderform_name": req.body.orderform_name,
                "orderform_time": (Date.parse(moment(req.body.orderform_time)) / 1000)
            };


            //插入数据库
            db.table('orderform').add(data).then(function (insertId) {

                res.redirect('/orderform/orderform_list');
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
module.exports.orderformEdit = function (req, res) {

    var orderform_id = req.params.orderform_id || 0;

    var where = `orderform_id = ${orderform_id}`;


    getAllTeachar(function (result) {
        let allTeachar;
        allTeachar = result;
        db.table("orderform").join({
            user: {
                on: ["user_id", "user_id"]
            }
        }).where(where).find().then(function (data) {



            if (JSON.stringify(data) == "{}") {
                base.showMsg(res, "班级不存在", '/orderform/orderform_list');
                return false;
            } else {
                // console.log(data);
                //转化时间
                data.orderform_time = moment(data.orderform_time * 1000).format("YYYY-MM-DD");


                xtpl.renderFile(
                    path.join(__dirname, "../views/admin/orderform/orderform_edit.html"), {
                        orderformInfo: data,
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
module.exports.orderformEditData = function (req, res) {
    var orderform_id = req.params.orderform_id || 0;

    var where = `orderform_id = ${orderform_id}`;

    db.table("orderform").where(where).find().then(function (data) {

        if (JSON.stringify(data) == "{}") {
            base.showMsg(res, "班级不存在", '/orderform/orderform_list');
            return false;
        } else {
            var check = `orderform_name = '${req.body.orderform_name}' AND orderform_id != ${orderform_id}`;

            //先查询该班级是否存在
            db.table("orderform").where(check).find().then(function (data) {
                //将对象转化为字符串
                if (JSON.stringify(data) != "{}") {
                    base.showMsg(res, "班级已存在");
                    return false;
                } else {


                    //封装数据部分
                    var data = {
                        "orderform_name": req.body.orderform_name,
                        "orderform_time": (Date.parse(req.body.orderform_time) / 1000),
                        "user_id": req.body.user_id
                    };



                    //更新数据库
                    db.table('orderform').where(`orderform_id = ${orderform_id}`).update(data).then(function (affectRows) {

                        res.redirect('/orderform/orderform_list');
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
module.exports.orderformDelete = function (req, res) {

    var orderform_id = req.params.orderform_id || 0; //获取删除单个班级id
    let orderform_ids = req.body.orderform_id || 0; //获取删除多个班级id
    orderform_ids = orderform_ids.join(","); //数组转换字符串

    //判断是批量删除还是单个删除
    var where = orderform_ids != 0 ? `orderform_id in (${orderform_ids}) and usertype_id = 1` : `orderform_id = ${orderform_id} and usertype_id = 1`
    var delorderformWhere = orderform_ids != 0 ? `orderform_id in (${orderform_ids})` : `orderform_id = ${orderform_id}`

    //拿到指定班级的所有学生信息
    db.table('useroforderform').join({
        user: {
            on: ["user_id", "user_id"]
        }
    }).where(where).getField("student_user.user_id").then(function (data) {

        //拿到该班级下所有的学生
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
            deleteFunc("orderform", delorderformWhere, "删除班级成功", "删除班级信息出错");
        }).catch();
        //删除学生账号
        // deleteFunc("account",`user_id IN(${str})`,"删除学生账号成功","删除学生账号信息出错");
        // //删除学生钱包
        // deleteFunc("money",`user_id IN(${str})`,"删除学生钱包成功","删除学生钱包信息出错");
        // //删除学生反馈
        // deleteFunc("feedback",`user_id IN(${str})`,"删除学生反馈成功","删除学生反馈信息出错");
        // //删除学生所属班级关系删除
        // deleteFunc("useroforderform",`user_id IN(${str})`,"删除学生班级关系成功","删除学生班级关系信息出错");
        //如果班级下面没有学生的话  就直接删除班级


    });
};