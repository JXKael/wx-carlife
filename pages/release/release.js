// pages/release/release.js

//获取应用实例
const app = getApp();

var request = require('../../utils/request.js');

var imageUploadURL = "https://netcarlife.com/editor/upload"

var menu_hash = {
  "汽车": 1,
  "车魂魅影": 2,
  "人车故事": 3,
  "自驾壮游": 4,
  "摩托车": 5,
  "摩界映像": 6,
  "骑行生活": 7,
  "摩旅天下": 8,
  "趣玩": 9,
  "玩物": 10,
  "玩家": 11
}

Page({
  data: {
    title: "", // 作品标题
    mainMenu: ["汽车", "摩托车", "趣玩"],
    mainMenuId: -1,
    mainMenuTxt: "",
    menu_0: ["车魂魅影", "人车故事", "自驾壮游"],
    menu_1: ["摩界映像", "骑行生活", "摩旅天下"],
    menu_2: ["玩物", "玩家"],
    menuId: -1,
    menuTxt: "",
    elementNum: 0,
    summary: "", // 作品介绍
    hasCover: false, // 是否有封面
    imageCover: "", // 封面路径
    coverURL: "", // 上传成功后图片url
    content: [], // 正文
    imageNum: 0, // 图片数量
    dates: "", // 拍摄时间
    location: "", // 拍摄地点
    equip: "", // 拍摄装备
    hasWaterMark: false, // 是否有水印
    hasAuth: false, // 是否授权
    hasUserInfo: false, // 是否有用户信息
    userProfile: {} // 用户信息
  },

  /**
   * 生命周期函数--监听页面显示
   */
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
        wx.showModal({
          title: "登录提示",
          content: "您尚未登录，是否登录？",
          success: function (res) {
            if (res.confirm){
              wx.navigateTo({
                url: '../login/login',
              })
              return
            }
            if (res.cancel) {
              wx.navigateBack({
                delta: 1
              })
              return
            }
          }
        })
      }
    })
  },

  /**
   * 主栏目选择事件
   */
  bindMainMenuPickerChange: function (e) {
    this.setData({
      mainMenuId: e.detail.value,
      mainMenuTxt: this.data.mainMenu[e.detail.value],
      menuId: -1,
      menuTxt: ""
    })
  },

  /**
   * 子栏目选择
   */
  bindMenuPickerChange: function (e) {
    if (this.data.mainMenuId == 0){
      this.setData({
        menuId: menu_hash[this.data.menu_0[e.detail.value]],
        menuTxt: this.data.menu_0[e.detail.value]
      })
    }else if (this.data.mainMenuId == 1){
      this.setData({
        menuId: menu_hash[this.data.menu_1[e.detail.value]],
        menuTxt: this.data.menu_1[e.detail.value]
      })
    }else if (this.data.mainMenuId == 2){
      this.setData({
        menuId: menu_hash[this.data.menu_2[e.detail.value]],
        menuTxt: this.data.menu_2[e.detail.value]
      })
    }
  },

  /**
   * 作品标题失焦事件函数
   */
  inputTitleFocusBlur: function (e) {
    console.log("作品标题失去焦点")
    console.log(e)
    var value = e.detail.value
    this.setData({
      title: value
    })
  },

  /**
   * 作品介绍失焦事件函数
   */
  taSummaryFocusBlur: function (e) {
    console.log("作品介绍失去焦点")
    console.log(e)
    this.setData({
      summary: e.detail.value
    })
  },

  /**
   * 点击添加，根据id判断类型
   * 0 --- 文字
   * 1 --- 照片
   * 2 --- 标注
   * 3 --- 视频
   */
  insert: function (e) {
    var ctype = e.currentTarget.dataset.ctype
    switch (ctype){
      case "0": this.insertParagraph(ctype); break;
      case "1": this.insertImage(ctype); break;
      case "2": this.insertLabel(ctype); break;
      case "3": this.insertVideo(ctype); break;
      default: break
    }
  },

  /**
   * 添加文字元素
   */
  insertParagraph: function (ctype) {
    var newContent = this.data.content;
    var newElementNum = this.data.elementNum
    newContent.push({
      uniqueKey: "unique" + "_" + ctype + "_" + newElementNum,
      ctype: ctype,
      index: newElementNum,
      content: ""
    });

    newElementNum++
    this.setData({
      content: newContent,
      elementNum: newElementNum
    });
  },

  /**
   * 添加图片元素
   */
  insertImage: function (ctype) {
    var newContent = this.data.content;
    var newElementNum = this.data.elementNum
    newContent.push({
      uniqueKey: "unique" + "_" + ctype + "_" + newElementNum,
      ctype: ctype,
      index: newElementNum,
      hasImage: false,
      imagePath: "",
      imageURL: ""
    });

    newElementNum++
    this.setData({
      content: newContent,
      elementNum: newElementNum
    });
  },

  /**
   * 添加标注元素
   */
  insertLabel: function (ctype) {
    var newContent = this.data.content;
    var newElementNum = this.data.elementNum
    newContent.push({
      uniqueKey: "unique" + "_" + ctype + "_" + newElementNum,
      ctype: ctype,
      index: newElementNum,
      content: ""
    });

    newElementNum++
    this.setData({
      content: newContent,
      elementNum: newElementNum
    });
  },

  /**
   * 添加视频元素
   */
  insertVideo: function (ctype) {
    var newContent = this.data.content;
    var newElementNum = this.data.elementNum
    newContent.push({
      uniqueKey: "unique" + "_" + ctype + "_" + newElementNum,
      ctype: ctype,
      index: newElementNum,
      content: ""
    });

    newElementNum++
    this.setData({
      content: newContent,
      elementNum: newElementNum
    });
  },

  /**
   * 点击添加封面
   */
  onTapChooseCoverImage: function (e) {
    console.log("添加封面")
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          hasCover: true,
          imageCover: tempFilePaths[0],
        })
      }
    })
  },

  /**
   * 封面长按事件
   */
  onLongPressCover: function (e) {
    console.log("长按封面")
    console.log(e)
    var that = this
    if (!this.data.hasCover) return
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: "提示",
      content: "重新选择封面",
      success: function (res) {
        if (res.confirm) {
          // 重新选择封面
          that.onTapChooseCoverImage()
        }
      }
    })
  },

  /**
   * 元素长按事件函数，删除本元素
   */
  onLongPressElement: function (e) {
    console.log("长按元素")
    console.log(e)
    var that = this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: "提示",
      content: "确认删除此模块",
      success: function (res) {
        if (res.confirm) {
          // 删除此模块
          var newContent = that.data.content
          if (newContent[index].index == index) {
            var newElementNum = that.data.elementNum - 1
            var newImageNum = that.data.imageNum
            if (newContent[index].ctype == 1){
              newImageNum--
            }
            newContent.splice(index, 1);
            for (var i = index; i < newElementNum; i++) {
              newContent[i].index--
            }
            that.setData({
              content: newContent,
              elementNum: newElementNum,
              imageNum: newImageNum
            })
          }
        }
      }
    })
  },

  /**
   * 正文文字失焦事件函数
   */
  taParagraphFocusBlur: function (e) {
    console.log("段落失去焦点")
    console.log(e)
    var index = e.currentTarget.dataset.index
    var newContent = this.data.content
    if (newContent[index] != null){
      // 经测试，长按之后点击确定会触发失焦事件，再触发长按成功回调
      // 虽然本版本在前，但以防万一添加判空
      newContent[index].content = e.detail.value
      this.setData({
        content: newContent
      })
    }
  },

  /**
   * 点击添加图片
   */
  onTapChooseImage: function (e) {
    console.log("添加图片")
    console.log(e)
    var index = e.currentTarget.dataset.index
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var newContent = that.data.content
        var newImageNum = that.data.imageNum +1
        newContent[index].hasImage = true
        newContent[index].imagePath = tempFilePaths[0]
        that.setData({
          content: newContent,
          imageNum: newImageNum
        })
      }
    })
  },

  /**
   * 标注文字失焦事件函数
   */
  taLabelFocusBlur: function (e) {
    console.log("标注失去焦点")
    console.log(e)
    var index = e.currentTarget.dataset.index
    var newContent = this.data.content
    if (newContent[index] != null) {
      newContent[index].content = e.detail.value
      this.setData({
        content: newContent
      })
    }
  },

  /**
   * 视频失焦事件函数
   */
  taVideoFocusBlur: function (e) {
    console.log("视频失去焦点")
    console.log(e)
    var index = e.currentTarget.dataset.index
    var newContent = this.data.content
    if (newContent[index] != null) {
      newContent[index].content = e.detail.value
      this.setData({
        content: newContent
      })
    }
  },

  /**
   * 拍摄时间事件函数
   */
  bindDateChange: function (e) {
    console.log("拍摄时间失去焦点")
    console.log(e)
    this.setData({
      dates: e.detail.value
    })
  },

  /**
   * 拍摄地点失去焦点事件函数
   */
  onLocationFocusBlur : function (e) {
    console.log("拍摄地点失去焦点")
    console.log(e)
    this.setData({
      location: e.detail.value
    })
  },

  /**
   * 拍摄装备失去焦点事件函数
   */
  onEquipFocusBlur: function (e) {
    console.log("拍摄地点失去焦点")
    console.log(e)
    this.setData({
      equip: e.detail.value
    })
  },

  /**
   * 添加水印
   */
  onWaterMarkCheckboxChange: function (e) {
    console.log("添加水印")
    console.log(e)
    this.setData({
      hasWaterMark: e.detail.value
    })
  },

  /**
   * 添加授权
   */
  onAuthCheckboxChange: function (e) {
    console.log("添加授权")
    console.log(e)
    this.setData({
      hasAuth: e.detail.value
    })
  },

  /**
   * 点击提交
   */
  onTapBtnCommit: function (e) {
    console.log("提交")
    // 检查内容是否符合规则
    if (this.data.title.length == 0){
      wx.showToast({
        title: "请添加标题",
        icon: "none"    
      })
      return
    }
    if(this.data.menuTxt.length <= 0 || this.data.mainMenuTxt.length <= 0){
      wx.showToast({
        title: "请选择栏目",
        icon: "none"
      })
      return
    }
    if (!this.data.hasCover){
      wx.showToast({
        title: "请添加封面",
        icon: "none"
      })
      return
    }
    if (this.data.elementNum <= 0){
      wx.showToast({
        title: "请添加正文",
        icon: "none"
      })
      return
    }
    if (this.data.dates.length <= 0){
      wx.showToast({
        title: "请添加时间",
        icon: "none"
      })
      return
    }
    // 网络请求
    this.startCommit()
  },

  startCommit: function () {
    this.uploadCover()
  },

  /**
   * 上传封面，成功后上传正文图片
   */
  uploadCover: function () {
    wx.showLoading({
      title: "正在上传封面",
    })
    var that = this
    // 封面
    wx.uploadFile({
      url: imageUploadURL,
      filePath: that.data.imageCover,
      name: "file",
      success(res) {
        console.log("上传封面成功")
        console.log(res)
        var lastIndex = res.data.lastIndexOf("/")
        res.data = res.data.substring(lastIndex + 1, res.data.length)
        that.setData({
          coverURL: res.data
        })
        wx.hideLoading()
        // 上传正文图片
        that.uploadImages()
      },
      fail(res) {
        console.log("上传失败")
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: "上传封面失败",
          icon: "none"
        })
      }
    })
  },

  /**
   * 上传正文图片，递归调用
   */
  uploadImages: function () {
    const imageURLs = []
    this.uploadImage(0, imageURLs, 0)
  },

  /**
   * 上传单个图片，递归调用，成功后调用发布文章
   */
  uploadImage: function (index, imageURLs, imageCount) {
    var imageData = this.data.content[index]
    if (imageData == null){
      wx.hideLoading()
      wx.showToast({
        title: "上传图片成功",
      })
      console.log(imageURLs)
      var newContent = this.data.content
      for (var i = 0; i < this.data.elementNum; ++i) {
        if (newContent[i].ctype != 1 || !newContent[i].hasImage) {
          continue
        }
        newContent[i].imageURL = imageURLs[i]
      }
      this.setData({
        content: newContent
      })
      this.uploadContent()
      return
    }
    if (imageData.ctype != 1 || !imageData.hasImage){
      imageURLs.push("not image")
      this.uploadImage(++index, imageURLs, imageCount)
      return
    }
    wx.showLoading({
      title: "上传图片" + imageCount + "/" + this.data.imageNum,
    })
    var that = this
    console.log(imageData.imagePath)
    wx.uploadFile({
      url: imageUploadURL,
      filePath: imageData.imagePath,
      name: "file",
      success(res) {
        console.log("上传正文图片成功")
        console.log(res)
        var lastIndex = res.data.lastIndexOf("/")
        res.data = res.data.substring(lastIndex + 1, res.data.length)
        imageURLs.push(res.data)
        wx.hideLoading()
        that.uploadImage(++index, imageURLs, ++imageCount)
      },
      fail(res) {
        console.log("上传正文图片失败")
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: "上传图片失败",
          icon: "none"
        })
      }
    })
  },

  /**
   * 发布内容
   */
  uploadContent: function () {
    wx.showLoading({
      title: "发布中",
    })
    var post_content = []
    for (var i = 0; i < this.data.elementNum; ++i) {
      var ele = this.data.content[i]
      switch (ele.ctype) {
        case "0": post_content.push({ text: ele.content }); break;
        case "1": post_content.push({ image: ele.imageURL }); break;
        case "2": post_content.push({ lab: ele.content }); break;
        case "3": post_content.push({ video: ele.content }); break;
        default: break
      }
    }
    var postData = {
      memberId: this.data.userProfile.memberId, // memberID
      title: this.data.title,// 标题
      menuId: this.data.menuId, // 栏目ID
      summary: this.data.summary,// 简介
      thumb: this.data.coverURL, // 封面
      content: JSON.stringify(post_content), // 内容
      shootTime: this.data.dates, // 拍摄时间
      address: this.data.location, // 拍摄地点
      equipment: this.data.equip, // 拍摄装备
      watermark: this.data.hasWaterMark ? 1 : 0, // 水印
      authorization: this.data.hasAuth ? 1 : 0, // 授权
    }
    console.log("文章内容")
    console.log(postData)
    request.requestData("post/add", "POST",
      postData,
      function (data) {
        // 发布成功
        console.log("发布成功")
        console.log(data)
        wx.hideLoading()
        wx.showToast({
          title: "发布成功"
        })
        // wx.navigateBack({
        //   delta: 1
        // })
      },
      function (data) {
        // 发布失败
        console.log("发布失败")
        console.log(data)
        wx.hideLoading()
        wx.showToast({
          title: data.data.message,
          icon: "none"
        })
      }, null
    )
  }
})
