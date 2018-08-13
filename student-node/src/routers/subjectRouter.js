'use strict';

const express = require('express');
const path = require('path');

const subjectCtrl = require(path.join(__dirname,"../controllers/subjectController.js"));


const subjectRouter = express.Router();

subjectRouter.get('/list',subjectCtrl.list);

subjectRouter.get('/add',subjectCtrl.add);

subjectRouter.post('/add',subjectCtrl.addData);

subjectRouter.get("/edit/:subjectId",subjectCtrl.edit);

subjectRouter.post('/edit/:subjectId',subjectCtrl.editData);

subjectRouter.get('/delete/:subjectId',subjectCtrl.delete);


module.exports = subjectRouter;



