'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const roleRouter = express.Router();


//引入控制器
const roleCtrl = require(path.join(__dirname,"../controllers/roleController.js"));


//  /role/role_list
roleRouter.get('/role_list',roleCtrl.roleList);

//添加
roleRouter.get('/role_add',roleCtrl.roleAdd);

//添加的post数据
roleRouter.post('/role_add',roleCtrl.roleAddData);

//编辑
roleRouter.get('/role_edit/:role_id',roleCtrl.roleEdit);

//编辑数据
roleRouter.post('/role_edit/:role_id',roleCtrl.roleEditData);

//删除
roleRouter.get('/role_delete/:role_id',roleCtrl.roleDelete);
//批量删除
roleRouter.post('/role_delete',roleCtrl.roleDelete);
module.exports = roleRouter;
