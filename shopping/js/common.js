/*
 * @Author: chenjian
 * @Date:   2018-05-05 15:20:51
 * @Last Modified by:   ChrisChen
 * @Last Modified time: 2018-05-07 10:32:24
 */

$(function() {
    // menu~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    $('#close').click(_close);

    function _close() {
        $('.menu').animate({
            'top': '-100%'
        }, 350, function() {
            $('.menu_list li').siblings().removeClass('active');
        });
    }

    $('#open').click(function() {
        $('.menu').animate({
            'top': 0
        }, 350);
    });


    $('.menu_list li').click(function() {
        let idx = $(this).index();
        $('.menu_list li a').eq(idx).addClass('active').parent().siblings().children().removeClass("active");
        // _close();
    });

    // slide~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    let key = false;
    let indexPage = 0;
    $('.next').click(function() {
        if (key) return;
        key = true;
        $('.slide_icon').animate({
            'margin-left': '-=100%'
        }, function() {
            indexPage++;
            console.log(indexPage);
            if (indexPage === 4) {
                $('.slide_icon').css('margin-left', '-100%');
                indexPage = 0;
            }
            key = false;
        })
    });
    $('.prev').click(function() {
        if (key) return;
        key = true;
        $('.slide_icon').animate({
            'margin-left': '+=100%'
        }, function() {
            indexPage--;
            console.log(indexPage);
            if (indexPage === -1) {
                $('.slide_icon').css('margin-left', '-400%');
                indexPage = 3;
            }
            key = false;
        })
    });

    // footer 
    $("footer ul li").click(function() {
        $(this).css("opacity", "1").siblings().css("opacity", "0.7");
    });

    $(function() {
        var oTop1 = $(document).scrollTop();
        $(window).scroll(function() {
            var oTop2 = $(document).scrollTop();
            if (oTop2 > oTop1) {
                $("header").css("top","-100px");
            } else {
                $("header").css("top","0")
            }
            oTop1 = $(document).scrollTop();
        });
    });
});