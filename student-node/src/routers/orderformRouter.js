'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const orderformRouter = express.Router();


//引入控制器
const orderformCtrl = require(path.join(__dirname,"../controllers/orderformControlle.js"));


//  /orderform/orderform_list
orderformRouter.get('/orderform_list',orderformCtrl.orderformList);

//添加
orderformRouter.get('/orderform_add',orderformCtrl.orderformAdd);

//添加的post数据
orderformRouter.post('/orderform_add',orderformCtrl.orderformAddData);

//编辑
orderformRouter.get('/orderform_edit/:orderform_id',orderformCtrl.orderformEdit);

//编辑数据
orderformRouter.post('/orderform_edit/:orderform_id',orderformCtrl.orderformEditData);

//删除
orderformRouter.get('/orderform_delete/:orderform_id',orderformCtrl.orderformDelete);
//批量删除
orderformRouter.post('/orderform_delete',orderformCtrl.orderformDelete);
module.exports = orderformRouter;
