'use strict'; //严格模式

const express = require('express');
const path = require('path');



//创建路由对象
const curriculumRouter = express.Router();


//引入控制器
const curriculumCtrl = require(path.join(__dirname,"../controllers/curriculumController.js"));


//  /curriculum/curriculum_list
curriculumRouter.get('/curriculum_list',curriculumCtrl.curriculumList);

//添加
curriculumRouter.get('/curriculum_add',curriculumCtrl.curriculumAdd);

//添加的post数据
curriculumRouter.post('/curriculum_add',curriculumCtrl.curriculumAddData);

//编辑
curriculumRouter.get('/curriculum_edit/:curriculum_id',curriculumCtrl.curriculumEdit);

//编辑数据
curriculumRouter.post('/curriculum_edit/:curriculum_id',curriculumCtrl.curriculumEditData);

//删除
curriculumRouter.get('/curriculum_delete/:curriculum_id',curriculumCtrl.curriculumDelete);
//批量删除
curriculumRouter.post('/curriculum_delete',curriculumCtrl.curriculumDeleteAll);


module.exports = curriculumRouter;
