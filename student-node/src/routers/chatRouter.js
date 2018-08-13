'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const chatRouter = express.Router();


//引入控制器
const chatCtrl = require(path.join(__dirname,"../controllers/chatController.js"));

//  /chat/chat_list
chatRouter.get('/chat_list',chatCtrl.chatList);

//添加
chatRouter.get('/chat_add',chatCtrl.chatAdd);

//添加的post数据
chatRouter.post('/chat_add',chatCtrl.chatAddData);

//编辑
chatRouter.get('/chat_edit/:chat_id',chatCtrl.chatEdit);

//编辑数据
chatRouter.post('/chat_edit/:chat_id',chatCtrl.chatEditData);

//删除
chatRouter.get('/chat_delete/:chat_id',chatCtrl.chatDelete);
//批量删除
chatRouter.post('/chat_delete',chatCtrl.chatDelete);
module.exports = chatRouter;
