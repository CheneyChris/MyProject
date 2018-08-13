'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const noticeRouter = express.Router();


//引入控制器
const noticeCtrl = require(path.join(__dirname,"../controllers/noticeController.js"));


//  /notice/notice_list
noticeRouter.get('/notice_list',noticeCtrl.noticeList);

//添加
noticeRouter.get('/notice_add',noticeCtrl.noticeAdd);

//添加的post数据
noticeRouter.post('/notice_add',noticeCtrl.noticeAddData);

//编辑
noticeRouter.get('/notice_edit/:notice_id',noticeCtrl.noticeEdit);

//编辑数据
noticeRouter.post('/notice_edit/:notice_id',noticeCtrl.noticeEditData);

//删除
noticeRouter.get('/notice_delete/:notice_id',noticeCtrl.noticeDelete);

//批量删除
noticeRouter.post('/notice_delete',noticeCtrl.noticeDeleteAll);
module.exports = noticeRouter;
