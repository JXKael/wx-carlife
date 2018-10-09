// pages/list/list.js

//获取应用实例
const app = getApp()

var util = require('../../utils/util');
var request = require('../../utils/request.js');

function getList(that, menuid) {
  if (that.data.hasMore) {
    request.requestData("menu/" + menuid + "/" + that.data.page, "GET", {},
      function (res) {
        // console.log(res)
        var newPosts = res.data.posts
        if (newPosts.length == 0) {
          that.setData({
            hasMore: false
          });
          return
        }
        var postList = that.data.postList
        for (var i = 0; i < newPosts.length; i++) {
          newPosts[i].createTime = util.getDateDiff(newPosts[i].createTime);
          postList.push(newPosts[i]);
        }
        that.setData({
          menuid: res.data.menu.menuId,
          menuName: res.data.menu.menuName,
          postCount: res.data.post_count,
          activitePoster: res.data.activity_posts,
          postList: postList,
          page: that.data.page + 1
        })
      }, null, null
    )
  }
}

Page({
  data: {
    menuid: 0, // 栏目id
    postCount: 0, // 栏目总博客数
    menuName: "",  // 栏目名称
    intro: "有温度的汽车影像", // 栏目简介
    activitePoster: [], // 活跃用户
    postList: [], // 文章列表
    hasMore: true,
    page: 1,
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    getList(this, options.menuid);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    getList(this, this.data.menuid);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 作品
   */
  waDetail: function (e) {
    wx.navigateTo({
      url: '../worksDetails/worksDetails?postid=' + e.currentTarget.dataset.postid
    })
  }
})
