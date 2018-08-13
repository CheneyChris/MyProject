'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const classRouter = express.Router();


//引入控制器
const classCtrl = require(path.join(__dirname,"../controllers/classController.js"));


//  /class/class_list
classRouter.get('/class_list',classCtrl.classList);

//添加班级
classRouter.get('/class_add',classCtrl.classAdd);

//添加班级的post数据
classRouter.post('/class_add',classCtrl.classAddData);

//编辑班级
classRouter.get('/class_edit/:class_id',classCtrl.classEdit);

//编辑班级数据
classRouter.post('/class_edit/:class_id',classCtrl.classEditData);

//删除班级
classRouter.get('/class_delete/:class_id',classCtrl.classDelete);

//批量删除班级
classRouter.post('/class_delete',classCtrl.classDeleteAll);
module.exports = classRouter;
