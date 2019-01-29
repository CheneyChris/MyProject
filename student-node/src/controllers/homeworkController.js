'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const fs = require("fs");

const db = require(path.join(__dirname, "../configs/database.js"));

const base = require(path.join(__dirname, "./baseController.js"));
const menuCtrl = require(path.join(__dirname, "./menuController.js"));

//作业列表界面
module.exports.homeworkList = function (req, res, next) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let text = req.query.text;
		let where = 1;
		if (text === null || text === undefined || text === "") {
			where = 1;
		} else {
			where = `h.homework_name LIKE '%${text}%'`
		}
		var sqldata = [
			'homework_id ,homework_name,homework_time,u.user_name,c.class_name',
			'student_homework as h inner join student_user as u on h.user_id = u.user_id inner join student_class as c on c.class_id = h.class_id'
		];
		base.showListOfSql(req, res, menuCtrl, 'homework', 'h', sqldata, where);

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

//作业添加界面
module.exports.homeworkAdd = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		db.table("class").select().then(classList => {

			db.table("user").select().then(userList => {

				let obj = {
					template: path.join(__dirname, "../views/admin/homework/homework_add.html"),
					data: {
						classList: classList, 	// 所有作业
						userList: userList,		// 所有老师
					},
					res
				};
				base.assign(obj);
			}).catch(err => {
				if (err) throw err;
			});
		}).catch(err => {
			if (err) throw err;
		});

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});

};


//处理post数据 添加作业
module.exports.homeworkAddData = function (req, res) {

	let data = {
		"homework_name": req.body.homework_name,
		"homework_content": req.body.homework_content,
		"homework_time": Date.parse(req.body.homework_time) / 1000,
		"class_id": req.body.class_id,
		"user_id": req.body.user_id,
	};
	db.table("homework").add(data)
		.then(() => {
			res.redirect("/homework/homework_list");
		}).catch(err => {
		if (err) throw err
	})
};


//作业编辑界面
module.exports.homeworkEdit = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		let homework_id = req.params.homework_id || 0;

		let where = `homework_id = ${homework_id} AND is_show=1`;

		db.table("homework").where(where).find().then(homework => {

			db.table("class").select().then(classList => {

				db.table("user").select().then(userList => {

					homework.homework_time = moment(homework.homework_time * 1000).format("YYYY-MM-DD");
					let obj = {
						template: path.join(__dirname, "../views/admin/homework/homework_edit.html"),
						data: {
							classList: classList, 	// 所有作业
							userList: userList,		// 所有老师
							homework: homework		//	 作业信息
						},
						res
					};
					base.assign(obj);
				}).catch(err => {
					if (err) throw err;
				});
			}).catch(err => {
				if (err) throw err;
			});
		}).catch(err => {
			if (err) throw err;
		});
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};


//处理post数据 编辑作业
module.exports.homeworkEditData = function (req, res) {
	let homework_id = req.params.homework_id || 0;

	db.table("homework").where(`homework_id=${homework_id} AND is_show=1`).find().then(is_homework => {
		if (JSON.stringify(is_homework) === "{}") {
			base.showMsg(res, "该作业不存在");
		} else {

			let data = {
				"homework_name": req.body.homework_name,
				"homework_content": req.body.homework_content,
				"homework_time": Date.parse(req.body.homework_time) / 1000,
				"class_id": req.body.class_id,
				"user_id": req.body.user_id,
			};
			db.table("homework").where(`homework_id=${homework_id} AND is_show=1`).update(data)
				.then(() => {
					res.redirect("/homework/homework_list");
				}).catch(err => {
				if (err) throw err
			})
		}
	});
};

//单表删除方法
function deleteFunc(table, where, msg = "", errmsg = "") {

	db.table(table).where(where).delete().than(function (effectrow) {

		if (effectrow > 0) {
			base.showMsg(res, msg);
		}
	}).catch(function (err) {
		throw new Exception(errmsg)
	})
}

//删除方法
module.exports.homeworkDelete = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let homework_id = req.params.homework_id;
		base.deleteOne(res, homework_id, "homework", "homework_id", "/homework/homework_list");
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};

module.exports.homeworkDeleteAll = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let homework_ids = req.body.homework_id;
		base.deleteALl(res, homework_ids, "homework", "homework_id", "/homework/homework_list");
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};
