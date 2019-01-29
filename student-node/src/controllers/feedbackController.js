'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const fs = require("fs");

const db = require(path.join(__dirname, "../configs/database.js"));

const base = require(path.join(__dirname, "./baseController.js"));
const menuCtrl = require(path.join(__dirname, "./menuController.js"));

//反馈列表界面
module.exports.feedbackList = function (req, res, next) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let text = req.query.text;
		let where = 1;
		if (text === null || text === undefined || text === "") {
			where = 1;
		} else {
			where = `f.feedback_name LIKE '%${text}%'`
		}
		let sqldata = [
			'f.feedback_id ,feedback_name,feedback_time,u.user_name,c.class_name,t.user_name as teachar_name',
			'student_feedback as f inner join student_user as u on f.user_id = u.user_id inner join student_class as c on c.class_id = f.class_id inner join student_user as t on t.user_id = f.teachar_id'
		];
		base.showListOfSql(req, res, menuCtrl, 'feedback', 'f', sqldata, where);
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

//反馈添加界面
module.exports.feedbackAdd = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		//  所有反馈人(学生)
		db.table("user").where(`usertype_id=1`).select().then(studentList => {

			//  被反馈的老师
			db.table("user").where(`usertype_id=2`).select().then(teacherList => {

				db.table("class").select().then(classList => {

					let obj = {
						template: path.join(__dirname, "../views/admin/feedback/feedback_add.html"),
						data: {
							classList, 	            // 所有班级
							teacherList,		        // 所有老师
							studentList,		        // 所有学生
						},
						res
					};
					base.assign(obj);
				})
			})
		})

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};


//处理post数据
module.exports.feedbackAddData = function (req, res) {
	let data = {
		"feedback_name": req.body.feedback_name,
		"feedback_content": req.body.feedback_content,
		"feedback_time": Date.parse(req.body.feedback_time) / 1000,
		"class_id": parseInt(req.body.class_id),
		"teachar_id": parseInt(req.body.teachar_id),
		"user_id": req.body.user_id || 1,    // 需要用户登录
		"is_show": 1
	};
	db.table("feedback").add(data).then(affectRow => {
		// console.log(affectRow);
		res.redirect("/feedback/feedback_list");
	}).catch(err => {
		if (err) throw err;
	});
};


//反馈编辑界面
module.exports.feedbackEdit = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let feedback_id = req.params.feedback_id || 0;

		let where = `feedback_id = ${feedback_id} AND is_show=1`;

		db.table("feedback").where(where).find().then(feedbackInfo => {

			//  所有反馈人(学生)
			db.table("user").where(`usertype_id=1`).select().then(studentList => {

				//  被反馈的老师
				db.table("user").where(`usertype_id=2`).select().then(teacherList => {

					db.table("class").select().then(classList => {

						feedbackInfo.feedback_time = moment(feedbackInfo.feedback_time * 1000).format("YYYY-MM-DD");

						let obj = {
							template: path.join(__dirname, "../views/admin/feedback/feedback_edit.html"),
							data: {
								feedbackInfo,           // 反馈信息
								classList, 	            // 所有班级
								teacherList,		        // 所有老师
								studentList,		        // 所有学生
							},
							res
						};
						base.assign(obj);
					})
				})
			})
		});

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};

//处理post数据 编辑反馈
module.exports.feedbackEditData = function (req, res) {
	let feedback_id = req.params.feedback_id || 0;
	let where = `feedback_id = ${feedback_id} AND is_show = 1`;

	db.table("feedback").where(where).find().then(feedbackInfo => {
		if (JSON.stringify(feedbackInfo) === "{}") {
			base.showMsg(res, "没有改反馈");
		} else {
			let data = {
				"feedback_name": req.body.feedback_name,
				"feedback_content": req.body.feedback_content,
				"feedback_time": Date.parse(req.body.feedback_time) / 1000,
				"class_id": req.body.class_id,
				"teachar_id": req.body.teachar_id,
				"user_id": req.body.user_id,    // 需要用户登录
			};
			db.table("feedback").where(where).update(data).then(affectRow => {
				res.redirect("/feedback/feedback_list");
			});
		}
	});


};

//单表删除方法


//删除方法
module.exports.feedbackDelete = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		let feedback_id = req.params.feedback_id;
		base.deleteOne(res, feedback_id, "feedback", "feedback_id", "/feedback/feedback_list");
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};

module.exports.feedbackDeleteAll = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let feedback_id = req.body.feedback_id;
		base.deleteALl(res, feedback_id, "feedback", "feedback_id", "/feedback/feedback_list");
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};
