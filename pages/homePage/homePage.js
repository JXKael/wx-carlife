//index.js
//获取应用实例
var util = require('../../utils/util');
var request = require('../../utils/request.js');
const app = getApp();

var page = 1;
var ismore = false;
function list(that) {
  if (ismore == false) {
    request.requestData('index/'+page, "GET", {}, function (data) {
      if (data.data.posts.length == 0) {
        ismore = true;
        that.setData({
          more: true
        });
      }
      for (var i = 0; i < data.data.posts.length; i++) {
        data.data.posts[i].createTime = util.getDateDiff(data.data.posts[i].createTime);
        that.data.Res.push(data.data.posts[i]);
      }
      that.setData({
        dataList: that.data.Res
      })
    }, null, null)
  }
}
Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    Res:[],
    more: false
  },
  onLoad: function () {
    var that = this;
    request.requestData('index/1', "GET", {}, function (data) {
      console.log(data.data)
      for (var i = 0; i < data.data.posts.length; i++) {
        data.data.posts[i].createTime = util.getDateDiff(data.data.posts[i].createTime);
        that.data.Res.push(data.data.posts[i]);
      }
      that.setData({
        dataList: that.data.Res,
        data: data.data
      })
    }, null, null)
  },
  onReachBottom: function () {
    var that = this;
    page = ++page;
    list(that);
    // wx.showLoading({ title: '加载着呢，等等...'});
  },
  release:function(e) {
    wx.navigateTo({
      url: '../release/release'
    })
  },
  waDetail:function(e){
    // console.log(e.currentTarget.dataset.postid)
    wx.navigateTo({
      url: '../worksDetails/worksDetails?postid=' + e.currentTarget.dataset.postid
    })
  }
})
