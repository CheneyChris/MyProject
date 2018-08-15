//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js');

Page({
  data: {
   datalist:[]
  },
  onLoad: function (options) 
  {
    var that = this,id = options.id;

    util.AJAX('theme/'+id,function(res){
        that.setData({
          datalist:res.data
        });
    });
  },
  onReady:function()
  {
    wx.setNavigationBarTitle({
      title: this.data.datalist.name,
    })
  }
})
