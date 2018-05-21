window.onresize = function () {
	document.title = window.outerWidth;
	autoSize()
}

window.onload = function () {
	autoSize();
}
function autoSize () {
	let imgct1 = document.getElementsByClassName("imgct1");
	for (let i = 0; i < imgct1.length; i++) {
		let sw = window.innerWidth;
		imgct1[i].style.width = sw + "px";
	}
}
