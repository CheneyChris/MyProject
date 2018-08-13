'use strict'
const path = require("path");
const db = require(path.join(__dirname, '../configs/database.js'));
const xtpl = require('xtpl');

function initMenu(req, getMenuData) {

	console.log("进来菜单了");
	let role_id = req.session.admin.role_id;
	console.log("--------------------");
	console.log(req.session.admin.role_id);

	if (role_id === 3) {    //管理员

		db.table("access").where('isnav=1 AND is_show=1').select().then((result) => {
			//数据组装成菜单栏的数据
			let parent = [];
			result.forEach(item => {
				if (item.parent_id == 0) {
					parent.push(item);
				}
				parent.forEach(parentEl => {
					parentEl['son'] = [];
				});
			});
			parent.forEach(parentEl => {
				result.forEach(item => {
					if (item.parent_id == parentEl.access_id) {
						parentEl['son'].push(item);
					}
				});
			});
			getMenuData(parent);
		})

	} else {     // 老师 // 学生 // ...
		db.query(`select * from student_accessofrole as a left join student_access as b on a.access_id = b.access_id where role_id=${role_id} and isnav=1 and b.is_show=1`).then(accessList => {
			console.log(accessList);
			// 所有的parent_id
			let parent_id = [];
			accessList.forEach(x => {
				parent_id.push(x.parent_id);
			});

			// 数组去重
			let parent_id_arr = Array.from(new Set(parent_id));
			console.log("parent的长度");
			console.log(parent_id_arr.length);
			let arr = [];
			let promise = new Promise(function (resolve, reject) {
				parent_id_arr.forEach(parent_id => {
					db.table("access").where(`access_id=${parent_id}`).select().then        (parent_0_obj => {
						// console.log("parent_id 等于0 的");
						arr.push(parent_0_obj[0]);
						if (arr.length === parent_id_arr.length) {
							console.log("循环完成");
							resolve();
						}
					});
				});
			});
			let all_arr = [];
			promise.then(function (resolve) {
				console.log("成功");
				all_arr = accessList.concat(arr);

				let parent = [];
				all_arr.forEach(item => {
					if (item.parent_id == 0) {
						parent.push(item);
					}
					parent.forEach(parentEl => {
						parentEl['son'] = [];
					});
				});
				parent.forEach(parentEl => {
					all_arr.forEach(item => {
						if (item.parent_id == parentEl.access_id) {
							parentEl['son'].push(item);
						}
					});
				});
				getMenuData(parent);
			}).catch(err => {
				if (err) throw err
			})
		});
	}
}

module.exports = initMenu