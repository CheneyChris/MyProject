'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const fs = require("fs");

const db = require(path.join(__dirname, "../configs/database.js"));

const base = require(path.join(__dirname, "./baseController.js"));
const menuCtrl = require(path.join(__dirname, "./menuController.js"));

//通告列表界面
module.exports.noticeList = function (req, res, next) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let text = req.query.text;
		let where = 1;
		if (text === "" || text === undefined || text == null) {
			where = 1;
		} else {
			where = `n.notice_title LIKE '%${text}%'`;
		}

		var sqldata = [
			'notice_id ,notice_title,notice_time,u.user_name,c.class_name',
			'student_notice as n inner join student_user as u on n.user_id = u.user_id inner join student_class as c on c.class_id = n.class_id'
		]
		base.showListOfSql(req, res, menuCtrl, 'notice', 'n', sqldata, where);
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});
};

//获取全部老师数据
function getAllTeachar(func) {
	let where = "usertype_id = 2";
	db.table("user").where(where).select().then(function (result) {
		func(result);
	}).catch(function (info) {
		console.log(info);
	});
}

//通告添加界面
module.exports.noticeAdd = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		db.table("class").select().then(classList => {
			db.table("user").where(`usertype_id=2`).select().then(userList => {
				let obj = {
					template: path.join(__dirname, "../views/admin/notice/notice_add.html"),
					data: {
						userList,
						classList
					},
					res
				}
				base.assign(obj);
			});
		});

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});

};

//处理post数据
module.exports.noticeAddData = function (req, res) {

	let where = `notice_title = '${req.body.notice_title}' AND is_show=1`;

	//先查询该通告是否存在
	db.table("notice").where(where).find().then(function (data) {
		//将对象转化为字符串
		if (JSON.stringify(data) != "{}") {
			res.setHeader("Content-Type", "text/html;charset=utf-8");
			res.end("<script>alert('该通告已经存在，请重新添加');location.href='/notice/notice_add';</script>");
			return false;
		} else {

			//封装数据部分
			var data = {
				"notice_title": req.body.notice_title,
				"notice_content": req.body.notice_content,
				"user_id": req.body.user_id,
				"class_id": req.body.class_id,
				"notice_time": (Date.parse(moment(req.body.notice_time)) / 1000),
				"is_show": 1
			};

			//插入数据库
			db.table('notice').add(data).then(function (insertId) {

				res.redirect('/notice/notice_list');
				return false;

			}).catch(function (err) {
				if (err) {
					return console.log(err);
				}
			});
		}

	});


};

//通告编辑界面
module.exports.noticeEdit = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let notice_id = req.params.notice_id;

		db.table("notice").where(`notice_id=${notice_id} AND is_show=1`).find().then(noticeInfo => {

			db.table("class").select().then(classList => {

				db.table("user").where(`usertype_id=2`).select().then(userList => {

					noticeInfo.notice_time = moment(noticeInfo.notice_time * 1000).format("YYYY-MM-DD");

					let obj = {
						template: path.join(__dirname, "../views/admin/notice/notice_edit.html"),
						data: {
							noticeInfo, 	// 公告信息
							classList,		// 所有班级
							userList, 		// 所有老师
						},
						res
					}
					base.assign(obj);
				});
			});
		});

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});

};

//处理post数据 编辑通告
module.exports.noticeEditData = function (req, res) {
	let notice_id = req.params.notice_id || 0;
	let where = `notice_id=${notice_id}`;
	db.table("notice").where(where).find().then(noticeInfo => {

		if (JSON.stringify(noticeInfo) === "{}") {
			base.showMsg(res, "该公告不存在", `/notice/notice_edit/${notice_id}`);
		} else {
			let data = {
				"notice_title": req.body.notice_title,
				"notice_content": req.body.notice_content,
				"notice_time": Date.parse(req.body.notice_time) / 1000,
				"class_id": req.body.class_id,
				"user_id": req.body.user_id,
			}
			db.table("notice").where(where).update(data).then(affectRow => {
				if (affectRow) {
					res.redirect("/notice/notice_list");
				}
			}).catch(err => {
				if (err) throw err;
			});
		}

	}).catch(err => {
		if (err) throw err
	});
};

//删除方法
module.exports.noticeDelete = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let id = req.params.notice_id;
		base.deleteOne(res, id, "notice", "notice_id", "/notice/notice_list");

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});

};

module.exports.noticeDeleteAll = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let ids = req.body.notice_id;
		base.deleteALl(res, ids, "notice", "notice_id", "/notice/notice_list");

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


}
