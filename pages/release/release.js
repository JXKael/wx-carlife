// pages/release/release.js

//获取应用实例
const app = getApp();
Page({
  data: {
    title: "", // 作品标题
    typeArray: ['汪星人', '喵星人', '其他物种'],
    typeArrayTxt: "",
    elementNum: 0,
    intro: "", // 作品介绍
    hasCover: false, // 是否有封面
    imageCover: "", // 封面路径
    content: [], // 正文
    time: "", // 拍摄时间
    location: "", // 拍摄地点
    equip: "", // 拍摄装备
    hasWaterMark: false, // 是否有水印
    hasAuth: false // 是否授权
  },

  bindPickerChangeType: function (e) {
    var that = this;
    that.setData({
      typeArrayTxt: that.data.typeArray[e.detail.value]
    })
  },

  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
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
  taIntroFocusBlur: function (e) {
    console.log("作品介绍失去焦点")
    console.log(e)
    var value = e.detail.value
    this.setData({
      intro: value
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
      imagePath: ""
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

  checkboxChange: function (e) {
    console.log(e)
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
          imageCover: tempFilePaths
        })
      }
    })
  },

  /**
   * 元素长按事件函数
   */
  onLongPressElement: function (e) {
    console.log("onLongTapPatagraph")
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
            newContent.splice(index, 1);
            for (var i = index; i < newElementNum; i++) {
              newContent[i].index--
            }
            that.setData({
              content: newContent,
              elementNum: newElementNum
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
        newContent[index].hasImage = true
        newContent[index].imagePath = tempFilePaths
        that.setData({
          content: newContent
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
   * 点击提交
   */
  onTapBtnCommit: function (e) {
    console.log("提交")
  }
})
