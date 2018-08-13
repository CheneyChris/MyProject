window.onresize = function () {
        document.title = window.outerWidth;
        autoSize();
    }
    window.onload = function () {
        autoSize();
    }
    function autoSize () {
        let imgct1 = document.querySelector(".imgct1 img");
        let imgct2 = document.querySelector(".imgct2 img");
        let imgct3 = document.querySelector(".imgct3 img");
        let container = document.querySelector(".container");
        let sw = container.offsetWidth-10;
        imgct1.style.width = sw + "px";
        imgct2.style.width = sw + "px";
        imgct3.style.width = sw + "px";
    }
