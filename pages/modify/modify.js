// pages/modify/modify.js

var request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bundMobile: false, // 是否绑定手机号
    mobile: "16601109127", // 手机号
    memberId: "", // 会员ID，唯一
    portraitImage: "", // 头像
    nickname: "", // 昵称
    name: "", // 姓名
    sign: "", // 个性签名
    birthday: "", // 生日
    sex: "", // 性别
    interest: "", // 兴趣
    professionId: 0, 
    profession: "", // 专业
    weiboLink: "", // 微博链接

    genders: ["男", "女"],
    professions: ["请选择", "电子、电器", "管理", "汽车", "机械", "计算机", "服务", "高新", "农副", "其他"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userProfile = wx.getStorage({
      key: "userProfile",
      success: function (res) {
        console.log(res.data)
        that.setData({
          bundMobile: res.data.bundMobile,
          memberId: res.data.memberId,
          nickname: res.data.nickname,
          portraitImage: res.data.portraitImage
        })
      },
      fail: function (res) {
        console.log("读取user profile失败")
      }
    })
  },

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
   * 手机号
   */
  bindMobileChange: function (e) {
    console.log("修改手机号")
  },

  /**
   * 昵称
   */
  onNicknameBlur: function (e) {
    console.log("修改昵称")
    this.setData({
      nickname: e.detail.value
    })
  },

  /**
   * 真实姓名
   */
  onNameBlur: function (e) {
    console.log("修改真实姓名")
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 个性签名
   */
  onSignBlur: function (e) {
    console.log("修改个性签名")
    this.setData({
      sign: e.detail.value
    })
  },

  /**
   * 生日
   */
  bindBirthdayChange: function (e) {
    console.log("修改生日")
    console.log(e)
    this.setData({
      birthday: e.detail.value
    })
  },

  /**
   * 性别
   */
  bindGenderChange: function (e) {
    console.log("修改性别")
    console.log(e)
    this.setData({
      sex: this.data.genders[(e.detail.value)]
    })
  },

  /**
   * 兴趣
   */
  onInterestBlur: function (e) {
    console.log("修改兴趣")
    this.setData({
      interest: e.detail.value
    })
  },

  /**
   * 专业
   */
  bindProfessionChange: function (e) {
    console.log("修改专业")
    this.setData({
      professionId: e.detail.value,
      profession: this.data.professions[e.detail.value]
    })
  },

  /**
   * 微博链接
   */
  onWeiboLinkBlur: function (e) {
    console.log("修改微博链接")
    this.setData({
      weiboLink: e.detail.value
    })
  },

  /**
   * 提交修改
   */
  onClickBtnCommit: function (e) {
    console.log("提交修改")
    wx.showLoading({
      title: "提交中",
    })
    request.requestData("member/update", "POST",
      {
        mobile: this.data.mobile, // 手机号
        memberId: this.data.memberId, // 会员ID，唯一
        nickname: this.data.nickname, // 昵称
        name: this.data.name, // 姓名
        sign: this.data.sign, // 个性签名
        birthday: this.data.birthday, // 生日
        sex: this.data.sex, // 性别
        interest: this.data.interest, // 兴趣
        profession: this.data.professionId, // 专业
        weiboLink: this.data.weiboLink, // 微博链接
      },
      function (res) {
        // 修改成功
        consoel.log("修改成功")
        console.log(res.data)
        wx.hideLoading()
        // 更新存储
        wx.setStorage({
          key: "userProfile",
          data: data.data.member,
        })
        wx.navigateBack({
          delta: 1
        })
      },
      function (res) {
        // 修改失败
        consoel.log("修改失败")
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: "修改失败",
          icon: "none"
        })
      }, null
    )
  }
})