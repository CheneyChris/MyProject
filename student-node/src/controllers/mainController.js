'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const captchapng = require('captchapng');  //验证码
const md5 = require('md5');

const db = require(path.join(__dirname, "../configs/database.js"));

const base = require(path.join(__dirname, "./baseController.js"));

const menuCtrl = require(path.join(__dirname, '../controllers/menuController.js'));

//登录界面
module.exports.signin = function (req, res) {
	let data = {
		template: path.join(__dirname, "../views/admin/main/signin.html"),
		data: {},
		res: res
	};

	base.assign(data);
};


//登录数据处理
module.exports.signinData = function (req, res) {
	// console.log("进来控制器提交");
	if (req.session.vcode != req.body.vcode) {
		base.showMsg(res, '验证码不正确', '/main/signin');
		return false;
	}

	let admin_name = req.body.admin_name;
	let admin_pwd = md5(req.body.admin_pwd);
	let sqltable = "account";
	let sqladmin_name = "account_account";
	let sqladmin_pwd = "account_pwd";
	let where = `${sqladmin_name} = '${admin_name}' AND ${sqladmin_pwd} = '${admin_pwd}'`;

	db.table(sqltable).where(where).find().then(function (data) { //判断用户输入的账号是否正确以及一系列的业务逻辑操作

		if (JSON.stringify(data) == "{}") {
			base.showMsg(res, '账号密码错误', '/main/signin');
			return false;
		} else {
			req.session.admin = data;  //你已经登录了，我要把你的信息状态记录起来
			global.role_id = req.session.admin.role_id;
			if (req.body.auto)   //如果你选中自动登录，我就把你的信息保存在你那边，方便你下次自动登录
			{
				res.cookie('auto', req.body.auto, { maxAge: 600000, httpOnly: true, 'signed': false });
				res.cookie('admin_id', data.account_id, { maxAge: 600000, httpOnly: true, 'signed': false });
			}
			base.showMsg(res, '登录成功', '/class/class_list');
			return false;

			// if (data.role_id === 3) { // 管理员
			// } else if (data.role_id === 2) {      // 老师
			// } else if (data.role_id === 1) {    //学生
			// }
		}
	}).catch(function (err) {  //如果数据库意外中断或者发生其他错误
		if (err) {
			base.showMsg(res, err, '/main/signin');
			return false;
		}
	});
};

module.exports.showHome = function (req, res) {

	var data = {
		template: path.join(__dirname, "../views/admin/layout.html"),
		data: {},
		res
	}
	base.assign(data);
}

//获取验证码并返回图片
module.exports.getVcodeImage = function (req, res) {
	var vcode = parseInt(Math.random() * 9000 + 1000);
	var p = new captchapng(80, 30, vcode);
	p.color(0, 0, 0, 0);
	p.color(80, 80, 80, 255);
	req.session.vcode = vcode;

	var img = p.getBase64();
	var imgbase64 = new Buffer(img, 'base64');
	res.writeHead(200, {
		'Content-Type': 'image/png'
	});
	res.end(imgbase64);
};

//退出
module.exports.signout = function (req, res) {
	req.session.admin = null;
	res.cookie('auto', undefined);
	res.cookie('admin_id', undefined);
	res.redirect('/main/signin');
	return false;
};

//注册界面
module.exports.signup = function (req, res) {
	var data = {
		template: path.join(__dirname, "../views/admin/main/signup.html"),
		data: {},
		res: res
	};
	base.assign(data);
};

module.exports.sendEmail = function (req, res) {
	//生成随机字符串
	var email_code = base.randomString();

	//组装数据
	var data = {
		email: req.body.email,
		subject: "H1801学生注册邮件",
		content: "邮件验证码为:" + email_code
	};

	//如果发送邮件成功就保存验证码到session里面

	base.signupEmail(data, function (err, info) {
		if (err) {
			var result = { send: false };
			res.json(result);
			return false;
		} else {
			req.session.email_code = email_code;
			var result = { send: true };
			res.json(result);
			return false;
		}
	});

};


//注册数据处理
module.exports.signupData = function (req, res) {
	console.log(req.body);
	return false;
};