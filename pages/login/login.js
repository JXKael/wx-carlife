// pages/login/login.js

var util = require('../../utils/util');
var request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    v_code_text: "获取验证码",
    v_code_sent: "-not-sent",
    phoneNumber: "",
    vCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 获取验证码
   */
  onClickGetVCode: function () {
    if (this.data.v_code_sent == "-sent") return
    if (this.data.phoneNumber.length == 0){
      return
    }
    if (this.data.phoneNumber.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: "none"
      })
      return
    }
  
    var that = this
    var countDown = 60
    this.setData({
      v_code_text: countDown + "s",
      v_code_sent: "-sent",
    })
    var intervalID = setInterval(function () {
      countDown -= 1
      that.setData({
        v_code_text: countDown + "s",
      })
      if (countDown <= 0) {
        clearInterval(intervalID)
        that.setData({
          v_code_text: "获取验证码",
          v_code_sent: "-not-sent",
        })
      }
    }, 1000)

    // 网络请求
    wx.showLoading({
      title: "请稍后",
      mask: true
    })
    
    request.requestData("index/getCode", "POST",
      {
        mobile: this.data.phoneNumber
      },
      function (data) {
        // 获取验证码成功
        console.log(data)
        wx.hideLoading()
        wx.showToast({
          title: "获取验证码成功"
        })
      },
      function (data) {
        // 获取验证码失败
        console.log(data)
        wx.hideLoading()
        wx.showToast({
          title: "获取验证码失败",
          icon: "none"
        })
      }, null)
  },

  /**
   * 手机号输入控件聚焦事件函数
   */
  inputPhoneNumberFocus: function(e) {
    this.setData({
      phoneNumber: ""
    })
  },

  /**
   * 手机号输入控件失焦事件函数
   */
  inputPhoneNumberBlur: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  /**
   * 验证码输入控件聚焦事件函数
   */
  inputVCodeFocus: function (e) {
    this.setData({
      vCode: ""
    })
  },

  /**
   * 验证码输入控件失焦事件函数
   */
  inputVCodeBlur: function (e) {
    this.setData({
      vCode: e.detail.value
    })
  },

  /**
   * 点击登录事件函数
   */
  onClickBtnLogin: function (e) {
    if (this.data.phoneNumber.length == 0) {
      return
    }
    if (this.data.phoneNumber.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: "none"
      })
      return
    }
    if (this.data.vCode.length == 0) {
      return
    }
    // 网络请求
    wx.showLoading({
      title: "请稍后",
      mask: true
    })

    request.requestData("member/login", "POST",
      {
        mobile: this.data.phoneNumber,
        code: this.data.vCode
      },
      function (data) {
        // 登录成功
        console.log(data.data.member)
        wx.hideLoading()
        // 设置存储
        if (data.data.member.nickname == null){
          data.data.member.nickname = "摄影达人"
        }
        if (data.data.member.portraitImage != null){
          data.data.member.portraitImage = "http://netcarlife.com/photograph/crop/144,96/" + data.data.member.portraitImage
        }
        wx.setStorage({
          key: "userProfile",
          data: data.data.member,
        })
        wx.navigateBack({
          delta: 1
        })
      },
      function (data) {
        // 登录失败
        console.log(data)
        wx.hideLoading()
        wx.showToast({
          title: "登录失败",
          icon: "none"
        })
      }, null
    )
  }
})