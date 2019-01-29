'use strict';
//已废弃的，该思路不通：xtmpl模板的渲染方式是一个页面只能有一个模板

const express = require('express');
const path = require('path');


//创建路由对象
const menuRouter = express.Router();
const menuCtrl = require(path.join(__dirname,'../controllers/menuController.js'));

menuRouter.get('*',menuCtrl.menuList);

module.exports = menuRouter;