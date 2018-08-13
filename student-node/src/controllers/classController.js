'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const fs = require("fs");

const db = require(path.join(__dirname, "../configs/database.js"));

const base = require(path.join(__dirname, "./baseController.js"));
const menuCtrl = require(path.join(__dirname, "./menuController.js"));

//班级列表界面
module.exports.classList = function (req, res, next) {
	console.log(req.session.admin);
	let text = req.query.text || null;
	let obj = {
		name: "class_name",
		value: text
	}
	let join = {
		"user": {
			join: 'inner',
			on: [`user_id`, `user_id`]
		}
	}
	base.showList(req, res, menuCtrl, 'class', join, obj);
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

//班级添加界面
module.exports.classAdd = function (req, res) {


	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		getAllTeachar(function (result) {
			let obj = {
				template: path.join(__dirname, "../views/admin/class/class_add.html"),
				data: {
					result_list: result
				},
				res
			}
			base.assign(obj);
		});


	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});
};


//处理post数据
module.exports.classAddData = function (req, res) {
	let class_id = req.params.class_id;
	let data = {
		"class_name": req.body.class_name,
		"class_time": Date.parse(req.body.class_time) / 1000,
		"user_id": req.body.user_id,
	}
	db.table("class").getField("class_name").then(class_name_arr => {
		let result = class_name_arr.indexOf(data.class_name);
		if (result !== -1) {
			base.showMsg(res, "该班级已存在", "/class/class_add");
			return false;
		} else {
			db.table("class").add(data).then(affectRows => {
				res.redirect("/class/class_list");
				return false;
			});
		}
	});
};

function oldShowEdit() {
	var class_id = req.params.class_id || 0;

	var where = `class_id = ${class_id}`;


	getAllTeachar(function (result) {
		let allTeachar;
		allTeachar = result;
		db.table("class").join({
			user: {
				on: ["user_id", "user_id"]
			}
		}).where(where).find().then(function (data) {

			if (JSON.stringify(data) == "{}") {
				base.showMsg(res, "班级不存在", '/class/class_list');
				return false;
			} else {
				// console.log(data);
				//转化时间
				data.class_time = moment(data.class_time * 1000).format("YYYY-MM-DD");


				xtpl.renderFile(
					path.join(__dirname, "../views/admin/class/class_edit.html"), {
						classInfo: data,
						allTeachar
					},
					function (err, content) {
						res.setHeader("Content-Type", "text/html;charset=utf-8");
						res.end(content);
					}
				);
			}

		});
	});
}

//班级编辑界面
module.exports.classEdit = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		let class_id = req.params.class_id;
		let join = {
			table: "user",
			join: "left",
			on: ['user_id', 'user_id']
		}
		db.table("class").join(join).where(`class_id = ${class_id}`).find().then(classInfo => {
			//  查询班主任

			classInfo.class_time = moment(classInfo.class_time * 1000).format("YYYY-MM-DD");

			db.table("user").where(`usertype_id=2`).select().then(classTeacher => {

				let obj = {
					template: path.join(__dirname, "../views/admin/class/class_edit.html"),
					data: {
						classInfo,
						classTeacher,
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


//处理post数据 编辑班级
module.exports.classEditData = function (req, res) {

	let class_id = req.params.class_id;
	let data = {
		"class_name": req.body.class_name,
		"class_time": Date.parse(req.body.class_time) / 1000,
		"user_id": req.body.user_id,
	}
	db.table("class").where(`class_id=${class_id}`).update(data).then(affectRows => {
		base.showMsg(res, "修改成功", "/class/class_list");
	}).catch(err => {
		console.log(err);
		base.showMsg(res, "修改失败", "/class/class_edit");
	});
};

//班级编辑界面


//废弃的老写法
function oldedit() {
	var class_id = req.params.class_id || 0;

	var where = `class_id = ${class_id}`;

	db.table("class").where(where).find().then(function (data) {

		if (JSON.stringify(data) == "{}") {
			base.showMsg(res, "班级不存在", '/class/class_list');
			return false;
		} else {
			var check = `class_name = '${req.body.class_name}' AND class_id != ${class_id}`;

			//先查询该班级是否存在
			db.table("class").where(check).find().then(function (data) {
				//将对象转化为字符串
				if (JSON.stringify(data) != "{}") {
					base.showMsg(res, "班级已存在");
					return false;
				} else {

					//封装数据部分
					var data = {
						"class_name": req.body.class_name,
						"class_time": (Date.parse(req.body.class_time) / 1000),
						"user_id": req.body.user_id
					};


					//更新数据库
					db.table('class').where(`class_id = ${class_id}`).update(data).then(function (affectRows) {

						res.redirect('/class/class_list');
						return false;

					}).catch(function (err) {
						if (err) {
							base.showMsg(res, '更新失败');
							console.log(err);
							return false;
						}
					});
				}

			});


		}

	});
}


//删除方法
module.exports.classDelete = function (req, res) {

	base.is_action(req, res, 3).then(resolve => {

		let class_id = req.params.class_id || 0; //获取删除单个班级id
		let where = `class_id=${class_id} AND is_show=1`;
		// 通过class_id 拿到 班级所在用户的id
		db.table("userofclass").where(where).getField("user_id").then(user_id => {

			// 删除班级
			db.table("class").where(where).update({"is_show": 0}).then(() => {

				//删除 班级所在所用用户
				user_id.forEach(item => {

					db.table("user").where(`user_id=${item}`).update({"is_show": 0}).then(() => {

					}).catch(err => {
						if (err) throw err;
					});
				});
				base.showMsg(res, "删除成功,并删除了该班级下所有的学生", "/class/class_list");
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

// 多条删除
module.exports.classDeleteAll = function (req, res) {


	base.is_action(req, res, 3).then(resolve => {
		let class_ids = req.body.class_id;
		// let where = `class_id=${class_id} AND is_show=1`;
		if (typeof class_ids === "object") {

			//  循环所有班级id 数组
			class_ids.forEach(class_id => {

				// 查询所有班级下面的学生
				db.table("userofclass").where(`class_id=${class_id} AND is_show=1`).getField("user_id").then(user_id => {

					// 删除班级
					db.table("class").where(`class_id=${class_id} AND is_show=1`).update({"is_show": 0}).then(() => {

						//删除 班级所在所用用户
						user_id.forEach(item => {

							db.table("user").where(`user_id=${item}`).update({"is_show": 0}).then(() => {

							}).catch(err => {
								if (err) throw err;
							});
						});
					}).catch(err => {
						if (err) throw err;
					});
				}).catch(err => {
					if (err) throw err;
				});

			});
			base.showMsg(res, "删除成功,并删除了该班级下所有的学生", "/class/class_list");

		} else if (typeof class_ids === "string") {

			let where = `class_id=${class_ids} AND is_show=1`;
			// 通过class_id 拿到 班级所在用户的id
			db.table("userofclass").where(where).getField("user_id").then(user_id => {

				// 删除班级
				db.table("class").where(where).update({"is_show": 0}).then(() => {

					//删除 班级所在所用用户
					user_id.forEach(item => {

						db.table("user").where(`user_id=${item}`).update({"is_show": 0}).then(() => {

						}).catch(err => {
							if (err) throw err;
						});
					});
					base.showMsg(res, "删除成功,并删除了该班级下所有的学生", "/class/class_list");
				}).catch(err => {
					if (err) throw err;
				});
			}).catch(err => {
				if (err) throw err;
			});
		}
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});
}



