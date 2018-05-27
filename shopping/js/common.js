$(function() {

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

    // lunbotu
    let startX = 0;
    let key = false;
    let indexPage = 0;
    document.querySelector('.slide').ontouchstart = function(e) {
        startX = e.changedTouches[0].clientX;
    };

    document.querySelector('.slide').ontouchend = function(e) {
        let endX = e.changedTouches[0].clientX;

        if (startX > endX) {
            // console.log('左滑');
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
        } else {
            // console.log('右滑');
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

        }
    };
})