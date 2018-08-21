//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js');

Page({
    data: {
        /**
         * 页面设置
         */
        winWidth: 0,
        winHeight: 0,

        //数据部分
        //精选数据
        datalist: [],

        //幻灯片数据
        topStories: [],

        //日报数据
        dataThemes: [],

        dataListDateCurrent: 0,
        dataListDateCount: 0,

        //tab 切换
        currentTab: 0,

        //loading
        hidden: true,
    },
    onLoad: function() {
        var that = this;

        //获取系统信息
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            },
        });

        //显示loading加载
        that.setData({
            hidden: false
        });


        //通过ajax请求来“精选分类”获取数据
        util.AJAX('news/latest', function(res) {
            //获取到数据
            var arr = res.data;

            //转化日期
            var format = util.getFormatDate(arr.date);

            //将转化后的时间格式，追加到arr的数组当中
            //格式化日期方便加载指定日期数据
            arr['dateDay'] = format.dateDay;

            //先获取到当前的精选数据
            var list = that.data.datalist;

            //将新数据合并到之前的数组里面
            that.setData({
                datalist: list.concat(arr),
                topStories: arr.top_stories,
                dataListDateCurrent: arr.date,
                dataListDateCount: 1,
                hidden: true
            });



        });

        //通过ajax请求日报数据
        // http://news-at.zhihu.com/api/4/themes 
        util.AJAX('themes', function(res) {
            var arr = res.data.others;
            that.setData({
                dataThemes: arr
            });
        });

    },
    switchNav: function(event) {
        var that = this;

        if (that.data.currentTab === event.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: event.target.dataset.current
            });
        }

    },
    bindchange: function(e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    }
})