//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js');
const WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        data: [],
        databody: null,
        winHeight: 0,
        comments: [],
    },
    onLoad: function(options) {
        var that = this,
            detail_id = options.detail_id;

        var article = '<div>我是HTML代码</div>';

        WxParse.wxParse('article', 'html', article, that, 5);

        //根据id去获取详细的文章内容
        util.AJAX('news/' + detail_id, function(res) {
            var arr = res.data;
            var body = arr.body;

            that.setData({
                databody: WxParse.wxParse('databody', 'html', body, that, 5),
                data: arr
            });
        });

        //根据id去获取文章的评论数据
        util.AJAX("story/" + detail_id + "/short-comments", function(res) {
            var arr = res.data.comments;
            //将时间戳 转化成标准时间格式
            for (var i = 0; i < arr.length; i++) {
                arr[i]['times'] = util.getTime(arr[i].time);
            }

            that.setData({
                comments: arr,
            });

        });

        /**
         * 获取系统的详细信息
         */
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    winHeight: res.windowHeight
                });
            },
        })


    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.datalist.name,
        })
    }
})