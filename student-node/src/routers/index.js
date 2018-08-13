'use strict'; //严格模式

const express = require('express');
const path = require('path');

//引入路由文件
const mainRouter = require('./mainRouter');
const accountRouter = require('./accountRouter');
const chatRouter = require('./chatRouter');
const classRouter = require("./classRouter");
const curriculumRouter = require('./curriculumRouter');
const expenseRouter = require('./expenseRouter');
const feedbackRouter = require('./feedbackRouter');
const homeworkRouter = require('./homeworkRouter');
const noticeRouter = require('./noticeRouter');
const roleRouter = require('./roleRouter');
const stucurrRouter = require('./stucurrRouter');
const userRouter = require('./userRouter');
const orderformRouter = require('./orderformRouter');
const chatServerRouter = require('./chatServerRouter');


const base = require(path.join(__dirname, "../controllers/baseController.js"));

const db = require(path.join(__dirname, "../configs/database.js"));

//测试
function test(app) {
	app.get("*", function (req, res, next) {
		// console.log(req.url);
		if (req.url == "/") {
			// let loginuser = {
			//     id:1+Math.ceil(Math.random()*10000),
			//     name:"小明"+Math.ceil(Math.random()*10000),
			//     img:"/uploads/5GsJDFnlect_vJh_dU3Yh2FN.png"
			// }
			// let jsonstr = JSON.stringify(loginuser);

			// res.cookie("loginUser",jsonstr,{maxAge:1000*60*60*24});
			res.redirect('/chatServer');
			next();
			return false;
		} else {
			next();
			return false;
		}
	});
}

//正式
function golive(app) {
	app.get("*", function (req, res, next) {
		console.log("当前路由地址：", req.url);
		if (req.url == "/main/signin" || req.url == "/main/siginup" || req.url == "/main/vcode") {
			if (req.cookies.auto != undefined && req.cookies.admin_id != undefined) {
				var where = `admin_id = ${req.cookies.admin_id}`;
				db.table('admin').where(where).find().then(function (data) {
					if (JSON.stringify(data) == "{}") {
						res.cookie('auto', undefined);
						res.cookie('admin_id', undefined);
						next();
					} else {
						req.session.admin = data;
						res.redirect('/class/class_list');
					}
				}).catch(function (err) {
					if (err) {
						res.cookie('auto', undefined);
						res.cookie('admin_id', undefined);
						next();
					}
				});
			} else {
				next(); //直接跳过    异步执行
				return false; //阻止next异步执行的时间
			}
		} else {
			console.log("当前登录用户：",req.session.admin);
			if (req.session.admin == undefined) {
				req.session.admin = null;
				res.redirect('/main/signin');
				return false;
			} else {
				next();
				return false;
			}
		}
	});

	//挂载路由
	useRouter(app);
}

//挂载路由 
function useRouter(app) {
	app.use('/main', mainRouter);
	app.use('/account', accountRouter);
	app.use('/chat', chatRouter);
	app.use('/class', classRouter);
	app.use('/curriculum', curriculumRouter);
	app.use('/expense', expenseRouter);
	app.use('/feedback', feedbackRouter);
	app.use('/homework', homeworkRouter);
	app.use('/notice', noticeRouter);
	app.use('/role', roleRouter);
	app.use('/stucurr', stucurrRouter);
	app.use('/user', userRouter);
	app.use('/orderform', orderformRouter);
	app.use('/chatServer', chatServerRouter);
}
//设置网站路由
var Router = function (app) {

	//测试版
	// test(app);

	//正式版
	golive(app);

};

function old(req, res, next) {

}
module.exports = Router;