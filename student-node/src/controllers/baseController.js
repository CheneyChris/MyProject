'use strict'; //严格模式
const express = require('express');
const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');

const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const wellknown = require("nodemailer-wellknown");
const config = wellknown("163"); //所选择的第三方服务
const db = require(path.join(__dirname, "../configs/database.js"));


//跳转方法
module.exports.showMsg = function (res, msg = '', url = false) {
	res.setHeader("Content-Type", "text/html;charset=utf-8");
	if (url) {
		res.end(`<script>alert('${msg}');location.href='${url}';</script>`);
		return false;
	} else {
		res.end(`<script>alert('${msg}');history.go(-1);</script>`);
		return false;
	}
};


//模板赋值
module.exports.assign = function (obj) {
	xtpl.renderFile(
		obj.template,
		obj.data,
		function (err, content) {
			obj.res.setHeader("Content-Type", "text/html;charset=utf-8");
			obj.res.end(content);
		}
	);
};


//生成随机数
module.exports.randomString = function (len = 4) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos = $chars.length;
	var pwd = '';
	for (var i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
};


module.exports.signupEmail = function (obj, callback) {
	config.auth = {
		user: 'dancefunk@163.com', //邮件账号
		pass: 'h1801123' //这里密码不是qq,163密码，是你设置的smtp授权密码
	};

	var transporter = nodemailer.createTransport(smtpTransport(config));

	var mailOptions = {
		from: "dancefunk@163.com", //发送方的邮件地址
		to: obj.email, //收件人的邮件地址
		subject: obj.subject, //邮件主题
		text: "text plain", //邮件文档类型
		html: obj.content //邮件正文内容
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function (error, info) {
		callback(error, info);
	});
};

//分页初始化
function initPage(table, getData, curpage = '1', limitshow = '12') {
	//当前页
	// const page = parseInt(req.query.page || '1');
	const page = curpage;
	//每页显示多少条
	// const limit = parseInt(req.query.limit || '12');
	const limit = limitshow;
	//偏移量
	const start = (page - 1) * limit;

	//总数
	db.table(table).count("*").then(function (count) {
		//总页数
		const totalPage = count % limit == 0 ? count / limit : parseInt(count / limit) + 1;

		//封装一个数组
		const totalPageArray = [];

		//组装页码数
		for (var i = 1; i <= totalPage; i++) {
			totalPageArray.push(i);
		}
		getData(start, limit, page, totalPage, totalPageArray);
	});
}

//添加到数据库的数据组装
function dataInit(req, table) {
	let p = new Promise(function (resolve, reject) {
		db.table(table).find().then(onedata => {
			let data = {};
			let timereg = /_time/;
			for (const key in onedata) {
				timereg.test(req.body[key]) ? data[key] = (Date.parse(req.body[key]) / 1000) : data[key] = req.body[key];
			}
			resolve(data);
		}).catch(function (err) {
			reject(err);
		});
	});
	return p;
}

//获取指定类型的用户信息
function getUserOfType(typeid) { //获取指定类型用户数据
	let p = new Promise(function (resolve, reject) {
		let where = `usertype_id in (${typeid})`;
		db.table("user").where(where).select().then(function (result) {
			resolve(result);
		}).catch(function (info) {
			reject(info);
		});
	});
	return p;
}

//显示该表、或者连表信息
function showList(req, res, menuCtrl, table, join = {}, whereobj = {}) {
	initPage(table, function (start, limit, page, totalPage, totalPageArray) {
		//获取数据
		let appwhere = null;
		if (JSON.stringify(whereobj) !== "{}") {

			if (whereobj.value === null) {
				appwhere = `student_${table}.is_show=1`;
			} else {
				appwhere = `student_${table}.${whereobj.name} LIKE '%${whereobj.value}%' AND student_${table}.is_show=1`;
			}

		} else {
			appwhere = `student_${table}.is_show=1`;
		}

		db.table(table).join(
			join
		).where(appwhere).order(`${table}_id DESC`).limit(start, limit).select().then(function (data) {
			menuCtrl(req, function (menuData) {
				xtpl.renderFile(
					path.join(__dirname, `../views/admin/${table}/${table}_list.html`), {
						array: data,
						totalPageArray: totalPageArray,
						page: page,
						totalPage: totalPage,
						menu_list: menuData
					},
					function (err, content) {
						if (err) {
							return console.log(err);
						}
						res.end(content);
					}
				);
			});
		}).catch(function (err) {
			console.log(err);
		});
	})
	// //当前页
	// // const page = parseInt(req.query.page || '1');
	// const page = curpage;
	// //每页显示多少条
	// // const limit = parseInt(req.query.limit || '12');
	// const limit = limitshow;
	// //偏移量
	// const start = (page - 1) * limit;

	// //总数
	// db.table(table).count("*").then(function (count) {
	//     //总页数
	//     const totalPage = count % limit == 0 ? count / limit : parseInt(count / limit) + 1;

	//     //封装一个数组
	//     const totalPageArray = [];

	//     //组装页码数
	//     for (var i = 1; i <= totalPage; i++) {
	//         totalPageArray.push(i);
	//     }

	//     //获取数据
	//     db.table(table).join(
	//         join
	//     ).order(`${table}_id DESC`).limit(start, limit).select().then(function (data) {
	//         console.log(data);
	//         menuCtrl(menuData => {
	//             xtpl.renderFile(
	//                 path.join(__dirname, `../views/admin/${table}/${table}_list.html`), {
	//                     array: data,
	//                     totalPageArray: totalPageArray,
	//                     page: page,
	//                     totalPage: totalPage,
	//                     menu_list: menuData
	//                 },
	//                 function (err, content) {
	//                     if (err) {
	//                         return console.log(err);
	//                     }
	//                     res.end(content);
	//                 }
	//             );
	//         });
	//     }).catch(function (err) {
	//         console.log(err);
	//     });;
	// });
}

//自定义sql语句显示表信息
function showListOfSql(req, res, menuCtrl, table, oname, sqldata, where = 1) {

	initPage(table, function (start, limit, page, totalPage, totalPageArray) {

		sqldata.push(`${where} AND ${oname}.is_show=1 limit ${start},${limit}`);
		db.query('SELECT %s FROM %s WHERE %s', sqldata).then(function (data) {
			menuCtrl(req, function (menuData) {
				xtpl.renderFile(
					path.join(__dirname, `../views/admin/${table}/${table}_list.html`), {
						array: data,
						totalPageArray: totalPageArray,
						page: page,
						totalPage: totalPage,
						menu_list: menuData
					},
					function (err, content) {
						if (err) {
							console.log("错误");
							return console.log(err);
						}
						res.end(content);
					}
				);
			});
		}).catch(function (err) {
			console.log(err);
		});
	})
}

//显示表单编辑信息
function tableShowEdit(req, res, userTypeid, table) {

	var edit_id = req.params[`${table}`] || 0;

	var where = `${table}_id = ${edit_id}`;

	getUserOfType(userTypeid).then(result => {
		let allUser;
		allUser = result;
		db.table(`${table}`).join({
			user: {
				on: ["user_id", "user_id"]
			}
		}).where(where).find().then(function (data) {

			if (JSON.stringify(data) == "{}") {
				base.showMsg(res, "班级不存在", `/${table}/${table}_list`);
				return false;
			} else {
				// console.log(data);
				//转化时间
				data.class_time = moment(data.class_time * 1000).format("YYYY-MM-DD");

				xtpl.renderFile(
					path.join(__dirname, `../views/admin/${table}/${table}_edit.html`), {
						classInfo: data,
						allUser
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

//表单编辑提交
function tableEditSubmit(req, res, table) {
	console.log(req);
	var class_id = req.params.class_id || 0;

	var where = `${table}_id = ${class_id}`;

	db.table(table).where(where).find().then(function (data) {

		if (JSON.stringify(data) == "{}") {
			base.showMsg(res, "该信息不存在", `/${table}/${table}_list`);
			return false;
		} else {
			var check = `${table}_name = '${req.body[`${table}_name`]}' AND ${table}_id != ${class_id}`;

			//先查询该班级是否存在
			db.table(`${table}`).where(check).find().then(function (data) {
				//将对象转化为字符串
				if (JSON.stringify(data) != "{}") {
					base.showMsg(res, "该信息已存在");
					return false;
				} else {
					dataInit(req, table).then(data => {
						//更新数据库
						db.table(`${table}`).where(`${table}_id = ${class_id}`).update(data).then(function (affectRows) {
							if (affectRows > 0) {
								res.redirect(`/${table}/${table}_list`);
								return false;
							} else {
								base.showMsg(res, '更新失败');
							}
						}).catch(function (err) {
							if (err) {
								base.showMsg(res, '更新失败');
								console.log(err);
								return false;
							}
						});
					});
				}
			});
		}

	});
}


// 无关联单条删除(软删除)
// 1. res  2.要删除的id 3.表名 4. 删除条件id 5. 路由地址
function deleteOne(res, id, table, where_id, router) {
	db.table(table).where(`${where_id}=${id} AND is_show=1`).update({"is_show": 0}).then(() => {
		res.redirect(router);
	});
}

// 无关联多条 删除 (软删除)
// 1. res  2.要删除的id 3.表名 4. 删除条件id 5. 路由地址
function deleteALl(res, ids, table, where_id, router) {

	// 1. 获取要删除的id
	// 2. 判断是多个还是一个,
	// 3. 如果多个循环删除,否则直接删除
	// 4. 重定向路由地址

	if (typeof ids === "object") {
		ids.forEach(item => {
			db.table(`${table}`).where(`${where_id}=${item} AND is_show=1`).update({"is_show": 0}).then(() => {

			}).catch(err => {
				if (err) throw err;
			});
		});
		res.redirect(`${router}`);
		return false;

	} else if (typeof ids === "string") {

		ids = parseInt(ids);
		db.table(`${table}`).where(`${where_id}=${ids} AND is_show=1`).update({"is_show": 0}).then(() => {
			res.redirect(`${router}`);
			return false;
		}).catch(err => {
			if (err) throw err;
		})

	}
}

function is_action(req, res, role_id = 3) {
	let promise = new Promise((resolve, reject) => {
		let url = null;
		// let a = "feedback_list?text=123";
		// /class_list/3   /class_list?id=3
		console.log("url-------------", req.url.indexOf("?"));
		if (req.url.indexOf("?") != -1) {
			url = req.url.replace(/\?.*/g, "").replace(/\//g, "");
			// console.log("req---------------", req.url.search(/\?_*/g));
		} else {
			url = req.url.replace(/\d/g, "").replace(/\//g, "");
			// console.log(url);
		}

		db.table("access").where(`access_url='${url}'`).find().then(currentRouter => {
				console.log(currentRouter);
				let currentUrl = currentRouter.access_id;
				db.table("accessofrole").where(`role_id=${role_id}`).select().then(accessInfo => {
					// 已有的权限
					let role_arr = [];
					accessInfo.forEach(item => {
						role_arr.push(item.access_id);
					});
					console.log("--------------------");
					console.log(currentUrl);
					console.log(role_arr);

					let current = [];
					role_arr.forEach(val => {
						if (val === currentUrl) {
							current.push(val);
						}
					});
					if (current.length > 0) {
						console.log("有权限");
						resolve("有权限");
						return true;
					} else {
						reject("没有权限");
						console.log("没有权限");
						res.setHeader("Content-Type", "text/html;charset=utf-8");
						res.end(`<script>alert('没有权限');history.go(-1);</script>`);
						return false;
					}
				});
			}
		).catch(err => {
			if (err) throw err;
		});
	});
	return promise;
}

module.exports.showList = showList;
module.exports.showListOfSql = showListOfSql;
module.exports.tableShowEdit = tableShowEdit;
module.exports.tableEditSubmit = tableEditSubmit;
module.exports.getUserOfType = getUserOfType;
module.exports.deleteALl = deleteALl;
module.exports.deleteOne = deleteOne;
module.exports.is_action = is_action;
