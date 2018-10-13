// pages/homePage/homePage.js

//获取应用实例
const app = getApp();

var util = require('../../utils/util');
var request = require('../../utils/request.js');

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
      for (var i = 0; i < data.data.adSlides.length; ++i) {
        data.data.adSlides[i].image = "http://netcarlife.com/photograph/crop/144,96/" + data.data.adSlides[i].image
      }
      that.setData({
        dataList: that.data.Res,
        adSlides: data.data.adSlides
      })
    }, null, null)
  }
}

Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    Res:[],
    more: false,
    adSlides: [
      { image: "../../image/jies1.jpg", url: "" },
      { image: "../../image/jies2.jpg", url: "" },
      { image: "../../image/jies3.jpg", url: "" }
    ]
  },
  onLoad: function () {
    var that = this;
    request.requestData('index/1', "GET", {}, function (data) {
      console.log(data)
      for (var i = 0; i < data.data.posts.length; i++) {
        data.data.posts[i].createTime = util.getDateDiff(data.data.posts[i].createTime);
        that.data.Res.push(data.data.posts[i]);
      }
      for (var i = 0; i < data.data.adSlides.length; ++i) {
        data.data.adSlides[i].image = "http://netcarlife.com/photograph/crop/144,96/" + data.data.adSlides[i].image
      }
      that.setData({
        dataList: that.data.Res,
        data: data.data,
        adSlides: data.data.adSlides
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
      url: "../release/release"
    })
  },
  waDetail:function(e){
    // console.log(e.currentTarget.dataset.postid)
    wx.navigateTo({
      url: "../worksDetails/worksDetails?postid=" + e.currentTarget.dataset.postid
    })
  },

  /**
   * 广告图片点击事件
   */
  onAdTap: function (e) {
    // console.log(e)
    var src = e.target.dataset.src
    wx.navigateTo({
      url: "../webView/webView?src=" + src,
    })
  }
})
