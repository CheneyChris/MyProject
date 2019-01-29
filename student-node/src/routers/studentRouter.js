'use strict';

const express = require('express');
const path = require('path');

//form表单需要的中间件。
const mutipart= require('connect-multiparty');

const mutipartMiddeware = mutipart();


//创建路由对象
const studentRouter = express.Router();
const studentCtrl = require(path.join(__dirname,'../controllers/studentController.js'));

//学生列表页面
studentRouter.get('/list',studentCtrl.list);

//新增学生页面
studentRouter.get('/add',studentCtrl.add);

//新增学生数据处理
studentRouter.post('/add',mutipartMiddeware,studentCtrl.addData);


//修改学生数据
studentRouter.get('/edit/:studentId',studentCtrl.edit);

studentRouter.post('/edit/:studentId',mutipartMiddeware,studentCtrl.editData);

//删除学生数据
studentRouter.get('/delete/:studentId',studentCtrl.delete);




module.exports = studentRouter;