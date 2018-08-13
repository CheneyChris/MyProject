'use strict'; //严格模式

const express = require('express');
const path = require('path');
const mutipart = require("connect-multiparty");
const mutipartMiddeware = mutipart();


//创建路由对象
const userRouter = express.Router();

//引入控制器
const userCtrl = require(path.join(__dirname, "../controllers/userController.js"));


//  /user/user_list
userRouter.get('/user_list', userCtrl.userList);

//添加
userRouter.get('/user_add', userCtrl.userAdd);

//添加的post数据
userRouter.post('/user_add', userCtrl.userAddData);

//编辑
userRouter.get('/user_edit/:user_id', userCtrl.userEdit);

//编辑数据
userRouter.post('/user_edit/:user_id', mutipartMiddeware, userCtrl.userEditData);

//删除
userRouter.get('/user_delete/:user_id', userCtrl.userDelete);

//批量删除
userRouter.post('/user_delete', mutipartMiddeware,userCtrl.userDeleteAll);

module.exports = userRouter;
