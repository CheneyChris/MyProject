/*
 * @Author: chenjian
 * @Date:   2018-05-13 16:55:17
 * @Last Modified by:   chenjian
 * @Last Modified time: 2018-05-15 16:11:00
 */

$(function() {
    let indexPage = 0;
    let firstImg = $(".slide ul li").first().clone();
    let lastImg = $(".slide ul li").last().clone();
    $(".slide ul").append(firstImg);
    $(".slide ul").prepend(lastImg);
    $(".slide ul").css("width",$(".slide ul li").length * 750);
    $(".slide ul").css("margin-left","-100%");
    let slide = setInterval(autoPlay, 3000);
    function autoPlay() {
        $(".slide ul").animate({
            marginLeft: "-=100%"
        }, function() {
            indexPage++;
            if (indexPage > $(".slide ul li").length - 3) { //下标从0开始, 然后减去两个克隆元素
                $(".slide ul").css("margin-left","-100%")
                indexPage = 0;
            }
        })
    }
})