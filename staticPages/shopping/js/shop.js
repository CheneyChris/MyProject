/*
* @Author: chenjian
* @Date:   2018-05-05 18:06:03
* @Last Modified by:   chenjian
* @Last Modified time: 2018-05-05 18:37:42
*/

$(()=> {
	$(".latest").click(()=> {
		$(".latest").addClass("active").siblings().removeClass("active");
		$(".latest_food").css("display","block").siblings().css("display","none");
	});
	$(".popular").click(()=> {
		$(".popular").addClass("active").siblings().removeClass("active");
		$(".popular_food").css("display","block").siblings().css("display","none");
	});
})