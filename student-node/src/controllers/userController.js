'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const fs = require("fs");

const db = require(path.join(__dirname, "../configs/database.js"));
const base = require(path.join(__dirname, "./baseController.js"));
const menuCtrl = require(path.join(__dirname, "./menuController.js"));

//用户列表界面
module.exports.userList = function (req, res, next) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		console.log("00000000000000000000");
		let text = req.query.text;
		let where = 1;
		console.log(req.url);
		if (text === "" || text === undefined || text === null) {
			where = 1;
		} else {
			where = `u.user_name LIKE '%${text}%'`;
		}

		let sqldata = [
			`user_id , u.user_img, user_name,user_sex, case user_sex when "1" then "男" when "0" then "女" end user_sex_zh ,user_time,user_phone ,ut.usertype_name`,
			`student_user as u inner join student_usertype as ut on u.usertype_id = ut.usertype_id`
		];
		base.showListOfSql(req, res, menuCtrl, 'user', 'u', sqldata, where);

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});
};

//班级添加界面
module.exports.userAdd = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		db.table("usertype").select().then(usertypeList => {
			let obj = {
				template: path.join(__dirname, "../views/admin/user/user_add.html"),
				data: {
					usertypeList
				},
				res
			}
			base.assign(obj);
		});
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});

};


//处理post数据 用户添加
module.exports.userAddData = function (req, res) {

	let data = {
		"user_name": req.body.user_name,
		"user_age": req.body.user_age,
		"user_sex": req.body.user_sex,
		"user_phone": req.body.user_phone,
		"user_introduction": req.body.user_introduction,
		"user_time": req.body.user_time,
		"usertype_id": req.body.usertype_id,
		"is_show": 1
	}

	if (req.files.user_img.size > 0) {
		data.user_img = req.files.user_img.name
	} else {
		data.user_img = 'placeholder.gif'
	}

	db.table("user").add(data).then(() => {
		// if (data.user_img === req.files.user_img.name) {
		// 	let readStream = fs.createReadStream(req.files.user_img.path);
		// 	let writeStream = fs.createWriteStream("./assets/uploads/" + req.files.user_img.name);
		// 	readStream.pipe(writeStream);
		// 	base.showMsg(res, "添加成功", "/user/user_list");
		// } else {
		// 	base.showMsg(res, "添加成功", "/user/user_list");
		// }
		base.showMsg(res, "添加成功", "/user/user_list");
	});

};


// 用户编辑页面
module.exports.userEdit = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let user_id = req.params.user_id;
		let join = {
			table: "class",
			join: "left",
			on: ['user_id', 'user_id']
		}

		db.table("user").where(`user_id=${user_id}`).find().then(userInfo => {

			// if (userInfo.usertype_id === 1) { //学生
			// } else if (userInfo.usertype_id === 2) { // 老师
			// } else if (userInfo.usertype_id === 3) { //管理员
			// }
			if (JSON.stringify(userInfo) === "{}") {
				base.showMsg(res, "没用该用户", "/user/user_list");
			} else {

				db.table("user").where(`user_id=${user_id}`).find().then(userInfo => {
					userInfo.user_time = moment(userInfo.user_time * 1000).format("YYYY-MM-DD");
					let obj = {
						template: path.join(__dirname, "../views/admin/user/user_edit.html"),
						data: {
							userInfo
						},
						res
					}
					base.assign(obj);
				});


				// // classInfo.class_id 当前所在班级id (学生)
				// db.table("userofclass").where(`user_id=${user_id}`).find().then(classInfo => {
				// 	// isClass.class_name  当前所在班级的名称
				// 	db.table("class").where(`class_id=${classInfo.class_id}`).find().then(isClass => {
				// 		db.table("class").select().then(class_list => {
				// 			let obj = {
				// 				template: path.join(__dirname, "../views/admin/user/user_edit.html"),
				// 				data: {
				// 					userInfo:userInfo,          // 当前用户信息
				// 					isClass:isClass,            // 当前班级信息
				// 					class_list:class_list       // 所有班级列表
				// 				},
				// 				res
				// 			}
				// 			base.assign(obj);
				// 		});
				// 	});
				// });

			}
		});

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};

//处理post数据 编辑用户
module.exports.userEditData = function (req, res) {
	let user_id = req.params.user_id || 0;
	let user_img = req.files.user_img || null;
	let data = {
		"user_name": req.body.user_name,
		"user_age": req.body.user_age,
		"user_sex": req.body.user_sex,
		"user_phone": req.body.user_phone,
		"user_time": Date.parse(req.body.user_time) / 1000,
	}
	if (req.files.user_img.size > 0) {
		data.user_img = path.basename(user_img.path);
	} else {
		data.user_img = 'placeholder.gif'
	}

	db.table("user").where(`user_id=${user_id} AND is_show=1`).update(data).then(() => {
		res.redirect("/user/user_list");
	});
};


//删除方法
module.exports.userDelete = function (req, res) {


	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let user_id = req.params.user_id;
		base.deleteOne(res, user_id, "user", "user_id", "/user/user_list");
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});
};

//批量删除
module.exports.userDeleteAll = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		let user_ids = req.body.user_id;
		base.deleteALl(res, user_ids, "user", "user_id", "/user/user_list");

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});

}

