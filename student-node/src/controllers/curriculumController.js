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
module.exports.curriculumList = function (req, res, next) {
	let text = req.query.text || null;
	let obj = {
		name: "curriculum_name",
		value: text
	};
	console.log(text);

	base.showList(req, res, menuCtrl, 'curriculum', {}, obj);

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
module.exports.curriculumAdd = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let obj = {
			template: path.join(__dirname, "../views/admin/curriculum/curriculum_add.html"),
			data: {},
			res
		};
		base.assign(obj);
	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});
};


//处理post数据
module.exports.curriculumAddData = function (req, res) {
	let curriculum_name = req.body.curriculum_name;
	db.table("curriculum").where(`curriculum_name=${curriculum_name}`).find().then(result => {
		if (JSON.stringify(result) !== "{}") {
			base.showMsg(result, "该课程已存在", "/curriculum/curriculum_add");
		} else {
			let data = {
				"curriculum_name": req.body.curriculum_name,
				"curriculum_price": parseInt(req.body.curriculum_price),
				"is_show": 1
			};
			db.table("curriculum").add(data).then(affectRow => {
				res.redirect("/curriculum/curriculum_list");
			}).catch(err => {
				if (err) throw err;
			});
		}
	}).catch(err => {
		if (err) throw err;
	});

};


//班级编辑界面
module.exports.curriculumEdit = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		let curriculum_id = req.params.curriculum_id || 0;
		db.table("curriculum").where(`curriculum_id=${curriculum_id}`).find().then(curriculumInfo => {

			let obj = {
				template: path.join(__dirname, "../views/admin/curriculum/curriculum_edit.html"),
				data: {
					curriculumInfo
				},
				res
			};
			base.assign(obj);

		}).catch(err => {
			if (err) throw err;
		});

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});
};


//处理post数据 编辑班级
module.exports.curriculumEditData = function (req, res) {

	let curriculum_id = req.params.curriculum_id;
	let data = {
		"curriculum_name": req.body.curriculum_name,
		"curriculum_price": parseInt(req.body.curriculum_price),
		"is_show": 1
	};
	db.table("curriculum").where(`curriculum_id=${curriculum_id}`).update(data).then(affectRow => {
		res.redirect("/curriculum/curriculum_list");
	}).catch(err => {
		if (err) throw err;
	});

};
//单表删除方法

//删除方法
module.exports.curriculumDelete = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {

		let curriculum_id = req.params.curriculum_id;
		base.deleteOne(res, curriculum_id, "curriculum", "curriculum_id", "/curriculum/curriculum_list");

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});

};

module.exports.curriculumDeleteAll = function (req, res) {
	base.is_action(req, res, req.session.admin.role_id).then(resolve => {
		let curriculum_id = req.body.curriculum_id;
		base.deleteALl(res, curriculum_id, "curriculum", "curriculum_id", "/curriculum/curriculum_list");

	}, reject => {
		res.end(`<script>alert('没有权限');history.go(-1);</script>`);
	});


};
