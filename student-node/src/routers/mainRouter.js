'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const mainRouter = express.Router();


//引入控制器
const mainCtrl = require(path.join(__dirname,"../controllers/mainController.js"));

//设置登录界面
mainRouter.get('/signin',mainCtrl.signin);

//设置登录的post提交界面
mainRouter.post('/signin',mainCtrl.signinData);

//退出
mainRouter.get('/signout',mainCtrl.signout);

//验证码
mainRouter.get('/vcode',mainCtrl.getVcodeImage);

//注册
mainRouter.get('/signup',mainCtrl.signup);

//注册提交数据
mainRouter.post('/signup',mainCtrl.signupData);

//发送邮件
mainRouter.post("/sendEmail",mainCtrl.sendEmail);


module.exports = mainRouter;
