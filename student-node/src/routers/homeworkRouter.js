'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const homeworkRouter = express.Router();


//引入控制器
const homeworkCtrl = require(path.join(__dirname,"../controllers/homeworkController.js"));


//  /homework/homework_list
homeworkRouter.get('/homework_list',homeworkCtrl.homeworkList);

//添加
homeworkRouter.get('/homework_add',homeworkCtrl.homeworkAdd);

//添加的post数据
homeworkRouter.post('/homework_add',homeworkCtrl.homeworkAddData);

//编辑
homeworkRouter.get('/homework_edit/:homework_id',homeworkCtrl.homeworkEdit);

//编辑数据
homeworkRouter.post('/homework_edit/:homework_id',homeworkCtrl.homeworkEditData);

//删除
homeworkRouter.get('/homework_delete/:homework_id',homeworkCtrl.homeworkDelete);

//批量删除
homeworkRouter.post('/homework_delete',homeworkCtrl.homeworkDeleteAll);
module.exports = homeworkRouter;
