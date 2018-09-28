// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    v_code_text: "获取验证码",
    count_down: 60,
    v_code_sent: "-not-sent"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获获取验证码
   */
  getVCode: function () {
    if (this.data.v_code_sent == "-sent") return
  
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
  }
})