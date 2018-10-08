// pages/modify/modify.js

var request = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bundMobile: false, // 是否绑定手机号
    mobile: "", // 手机号
    memberId: "", // 会员ID，唯一
    portraitImage: "", // 头像
    nickname: "", // 昵称
    name: "", // 姓名
    sign: "", // 个性签名
    birthday: "", // 生日
    sex: 0, // 性别
    sexTxt: "",
    interest: [], // 兴趣
    interestTxt: "", 
    professionId: 0, 
    profession: "", // 专业
    weiboLink: "", // 微博链接

    genders: ["保密", "男", "女"],
    professions: ["请选择", "电子、电器", "管理", "汽车", "机械", "计算机", "服务", "高新", "农副", "其他"],
    interests: [
      { id: 1, name: "汽车" },
      { id: 2, name: "摩托车" },
      { id: 3, name: "改装" },
      { id: 4, name: "旅游" },
      { id: 5, name: "摄影" },
      { id: 6, name: "音乐" },
      { id: 7, name: "文学" },
      { id: 8, name: "时尚" },
      { id: 9, name: "美食" },
      { id: 10, name: "科技" },
      { id: 11, name: "文化" },
      { id: 12, name: "影视" },
      { id: 13, name: "健身" }
    ],
    isInterestOpen: false
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
        var interest = res.data.interest
        var text = ""
        for (var i = 0; i < interest.length; ++i) {
          var tempInterest = that.data.interests[Number(interest[i]) - 1]
          tempInterest.checked = "true"
          text += tempInterest.name
          text += "、"          
        }
        text = text.substring(0, text.length - 1)
        that.setData({
          bundMobile: res.data.bundMobile,
          mobile: res.data.mobile,
          memberId: res.data.memberId,
          nickname: res.data.nickname,
          portraitImage: res.data.portraitImage,
          name: res.data.name,
          sign: res.data.sign,
          birthday: res.data.birthday,
          sex: res.data.sex,
          sexTxt: that.data.genders[res.data.sex],
          interest: res.data.interest,
          interestTxt: text,
          professionId: res.data.profession,
          profession: that.data.professions[res.data.profession],
          weiboLink: res.data.weiboLink,
        })
      },
      fail: function (res) {
        console.log("读取user profile失败")
      }
    })
    console.log(this.data.interests)
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
      sex: e.detail.value,
      sexTxt: this.data.genders[(e.detail.value)]
    })
  },

  /**
   * 兴趣
   */
  onTapInterest: function (e) {
    console.log("修改兴趣")
    this.setData({
      isInterestOpen: !this.data.isInterestOpen
    })
  },

  onInterestCheckBoxChange: function (e) {
    console.log("选择兴趣")
    console.log(e)
    var text = ""
    var array = []
    for (var i = 0; i < this.data.interests.length; ++i){
      this.data.interests[i].checked = null
    }
    for (var i = 0; i < e.detail.value.length; ++i){
      var tempInterest = this.data.interests[Number(e.detail.value[i]) - 1]
      tempInterest.checked = "true"
      text += tempInterest.name
      text += "、"
      array.push(Number(e.detail.value[i]))
    }
    text = text.substring(0, text.length - 1)
    this.setData({
      interestTxt: text,
      interest: array
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
    var post_data = {
      mobile: this.data.mobile, // 手机号
      // memberId: this.data.memberId, // 会员ID，唯一
      nickname: this.data.nickname, // 昵称
      name: this.data.name, // 姓名
      sign: this.data.sign, // 个性签名
      birthday: this.data.birthday, // 生日
      sex: Number(this.data.sex), // 性别
      interest: JSON.stringify(this.data.interest), // 兴趣
      profession: this.data.professionId, // 专业
      weiboLink: this.data.weiboLink, // 微博链接
    }
    console.log(post_data)
    var that = this
    request.requestData("member/update", "POST",
      post_data,
      function (res) {
        // 修改成功
        console.log("修改成功")
        console.log(res.data)
        wx.hideLoading()
        wx.showToast({
          title: "修改成功",
          mask: true
        })
        // 更新存储
        var userProfile = res.data.member
        if (userProfile.birthday == null) {
          userProfile.birthday = ""
        }
        if (userProfile.fans == null) {
          userProfile.fans = 0
        }
        if (userProfile.follow == null) {
          userProfile.follow = 0
        }
        if (userProfile.name == null) {
          userProfile.name = ""
        }
        if (userProfile.nickname == null) {
          userProfile.nickname = "摄影达人"
        }
        if (userProfile.point == null) {
          userProfile.point = 0
        }
        if (userProfile.portraitImage != null) {
          userProfile.portraitImage = "http://netcarlife.com/photograph/crop/144,96/" + userProfile.portraitImage
        }
        if (userProfile.postCount == null) {
          userProfile.postCount = 0
        }
        if (userProfile.profession == null) {
          userProfile.profession = 0
        }
        if (userProfile.sign == null) {
          userProfile.sign = ""
        }
        if (userProfile.weiboLink == null) {
          userProfile.weiboLink = ""
        }
        userProfile.mobile = that.data.mobile
        wx.setStorage({
          key: "userProfile",
          data: userProfile,
        })
        setTimeout(function (){
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      },
      function (res) {
        // 修改失败
        console.log("修改失败")
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: "修改失败",
          icon: "none",
          mask: true
        })
      }, null
    )
  }
})