// pages/my/my.js

//获取应用实例
const app = getApp()

Page({
  data: {
    focusNum:'0',
    fans:'0',
    works:'0',
    integral:'0',
    signature:'这个人很懒，什么都没留下',
    hasUserInfo:false
  },
  // onLoad: function () {
  //   wx.login({
  //     success: function (res) {
  //       if (res.code) {
  //         //发起网络请求
  //         wx.request({
  //           url: 'https://test.com/onLogin',
  //           data: {
  //             code: res.code
  //           }
  //         })
  //         console.log(1111)
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   });
  // },
  login: function(e) {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  getPhoneNumber: function(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.enc)
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://test.com/onLogin',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //       console.log(1111)
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
  }
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
