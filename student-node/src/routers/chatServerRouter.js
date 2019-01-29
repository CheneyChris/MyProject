'use strict';

const express = require('express');
const path = require('path');


//创建路由对象
const charServerRouter = express.Router();
const charServerCtrl = require(path.join(__dirname,'../controllers/chatServerController.js'));

//处理登录界面请求,使用getLoginPage控制器
charServerRouter.get('/',charServerCtrl.groupChat);
// charServerRouter.get('/:user_id/:ispri/:target_id',charServerCtrl.priveteChat);
// charServerRouter.get('/:user_id',charServerCtrl.chatServerInit);
// charServerRouter.get('/:user_id',charServerCtrl.chatServerInit);

module.exports = charServerRouter;