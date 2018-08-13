'use strict'; //严格模式

const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');
const fs = require("fs");

const db = require(path.join(__dirname, "../configs/database.js"));
const base = require(path.join(__dirname, "./baseController.js"));
const menuCtrl = require(path.join(__dirname, "./menuController.js"));

//权限列表界面
module.exports.roleList = function (req, res, next) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {


	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});

	base.showList(req, res, menuCtrl, 'role');
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

//权限添加界面
module.exports.roleAdd = function (req, res) {
	getAllTeachar(function (result) {
		let obj = {
			template: path.join(__dirname, "../views/admin/role/role_add.html"),
			data: {
				result_list: result
			},
			res
		}
		base.assign(obj);
	});
};


//处理post数据
module.exports.roleAddData = function (req, res) {


};


//权限编辑界面
module.exports.roleEdit = function (req, res) {

	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		db.table("access").select().then(accessList => {
			let parent = [];
			accessList.forEach(item => {
				if (item.parent_id === 0) {
					parent.push(item);
				}
				parent.forEach(list => {
					list.son = [];
				});
			});
			parent.forEach(x => {
				accessList.forEach(y => {
					if (x.access_id === y.parent_id) {
						x.son.push(y);
					}
				});
			});
			let obj = {
				template: path.join(__dirname, "../views/admin/role/role_edit.html"),
				data: {
					parent
				},
				res
			}
			base.assign(obj);
		});
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


	// base.is_action(req, res, req.session.admin.role_id).then(resolve => {
	//
	//
	// },reject => {
	// 	res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	// });

};

//处理post数据 编辑权限
module.exports.roleEditData = function (req, res) {


	let role_id = req.params.role_id;
	let access_id = req.body.access_id;

	if (typeof access_id === "object") {


		access_id.forEach(item => {
			db.table("accessofrole").where(`role_id=${role_id}`).add({
				"access_id": item,
				"role_id": role_id,
				"is_show": 1
			}).then(() => {
			}).catch(err => {
				if (err) throw err;
			})
		})
		base.showMsg(res, "编辑权限成功", "/role/role_list");

	} else if (typeof access_id === "string") {

		db.table("accessofrole").where(`role_id=${role_id}`).add({
			"access_id": access_id,
			"role_id": role_id,
			"is_show": 1
		}).then(() => {
			base.showMsg(res, "编辑权限成功", "/role/role_list")
		}).catch(err => {
			if (err) throw err;
		});
	}
};


//删除方法
module.exports.roleDelete = function (req, res) {

	base.showMsg(res, "无法删除");

};