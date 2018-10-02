// pages/my/my.js

//获取应用实例
const app = getApp()

Page({
  data: {
    focusNum: 0, // 关注数目
    fans: 0, // 粉丝数目
    works: 0, // 作品数目
    integral: 0, // 积分
    hasUserInfo: false,
    userProfile: {},
    signature: "这个人很懒，什么都没留下",
  },

  onLoad: function () {
  },

  onShow: function () {
    var that = this
    var userProfile = wx.getStorage({
      key: "userProfile",
      success: function (res) {
        that.setData({
          hasUserInfo: true,
          userProfile: res.data
        })
      },
      fail: function (res) {
      }
    })
  },

  /**
   * 点击登录事件函数，跳转至登录界面
   */
  onClickLogin: function(e) {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  /**
   * 点击修改按钮事件函数
   */
  onTapModify: function(e){
    wx.navigateTo({
      url: "../modify/modify",
    })
  }
})
