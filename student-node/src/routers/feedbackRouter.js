'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const feedbackRouter = express.Router();


//引入控制器
const feedbackCtrl = require(path.join(__dirname,"../controllers/feedbackController.js"));


//  /feedback/feedback_list
feedbackRouter.get('/feedback_list',feedbackCtrl.feedbackList);

//添加
feedbackRouter.get('/feedback_add',feedbackCtrl.feedbackAdd);

//添加的post数据
feedbackRouter.post('/feedback_add',feedbackCtrl.feedbackAddData);

//编辑
feedbackRouter.get('/feedback_edit/:feedback_id',feedbackCtrl.feedbackEdit);

//编辑数据
feedbackRouter.post('/feedback_edit/:feedback_id',feedbackCtrl.feedbackEditData);

//删除
feedbackRouter.get('/feedback_delete/:feedback_id',feedbackCtrl.feedbackDelete);

//批量删除
feedbackRouter.post('/feedback_delete', feedbackCtrl.feedbackDeleteAll);
module.exports = feedbackRouter;
