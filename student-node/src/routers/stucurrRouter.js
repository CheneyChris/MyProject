'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const stucurrRouter = express.Router();


//引入控制器
const stucurrCtrl = require(path.join(__dirname,"../controllers/stucurrController.js"));


//  /stucurr/stucurr_list
stucurrRouter.get('/stucurr_list',stucurrCtrl.stucurrList);

//添加
stucurrRouter.get('/stucurr_add',stucurrCtrl.stucurrAdd);

//添加的post数据
stucurrRouter.post('/stucurr_add',stucurrCtrl.stucurrAddData);

//编辑
stucurrRouter.get('/stucurr_edit/:stucurr_id',stucurrCtrl.stucurrEdit);

//编辑数据
stucurrRouter.post('/stucurr_edit/:stucurr_id',stucurrCtrl.stucurrEditData);

//删除
stucurrRouter.get('/stucurr_delete/:stucurr_id',stucurrCtrl.stucurrDelete);
//批量删除
stucurrRouter.post('/stucurr_delete',stucurrCtrl.stucurrDelete);
module.exports = stucurrRouter;
