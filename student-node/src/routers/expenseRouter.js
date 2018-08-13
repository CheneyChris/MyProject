'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const expenseRouter = express.Router();


//引入控制器
const expenseCtrl = require(path.join(__dirname,"../controllers/expenseController.js"));


//  /expense/expense_list
expenseRouter.get('/expense_list',expenseCtrl.expenseList);

//添加
expenseRouter.get('/expense_add',expenseCtrl.expenseAdd);

//添加的post数据
expenseRouter.post('/expense_add',expenseCtrl.expenseAddData);

//编辑
expenseRouter.get('/expense_edit/:expense_id',expenseCtrl.expenseEdit);

//编辑数据
expenseRouter.post('/expense_edit/:expense_id',expenseCtrl.expenseEditData);

//删除
expenseRouter.get('/expense_delete/:expense_id',expenseCtrl.expenseDelete);
//批量删除
expenseRouter.post('/expense_delete',expenseCtrl.expenseDeleteAll);
module.exports = expenseRouter;
