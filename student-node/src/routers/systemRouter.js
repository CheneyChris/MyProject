'use strict';

const express = require('express');
const path = require('path');

//创建路由对象
const systemRouter = express.Router();
const systemCtrl = require(path.join(__dirname,'../controllers/systemController.js'));


//系统默认首页
systemRouter.get('/index',systemCtrl.index);


module.exports = systemRouter;
