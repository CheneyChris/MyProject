/*
* @Author: chenjian
* @Date:   2018-05-24 13:00:40
* @Last Modified by:   chenjian
* @Last Modified time: 2018-05-24 18:24:04
*/

$(function(){
	let back = $("#back")[0];
	let key;
	$("#pull").click(function(){
		$("#menu").animate({ top : key ? "100px" : "-300px" },200);
		key = !key;
	});
	back.onclick = function(){
		history.back();
	}
})