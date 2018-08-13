/*
 * @Author: chenjian
 * @Date:   2018-05-15 11:34:06
 * @Last Modified by:   chenjian
 * @Last Modified time: 2018-05-15 17:49:21
 */

window.onload = function() {
    let beforeImg = document.querySelectorAll(".before");
    let afterImg = document.querySelectorAll(".after");
    let li = document.querySelectorAll("footer ul li");
    li[0].onclick = function() {
        location.href = "../index.html";
    }
    li[1].onclick = function() {
        location.href = "../page/class.html";
    }
    li[2].onclick = function() {
        location.href = "../page/find.html";
    }
    li[3].onclick = function() {
        location.href = "../page/self.html";
    }
    for (let i = 0; i < beforeImg.length; i++) {
        beforeImg[i].onclick = function() {
            for (let i = 0; i < beforeImg.length; i++) {
                afterImg[i].style.display = "none";
            }
            afterImg[i].style.display = "block";
        }
    }
}