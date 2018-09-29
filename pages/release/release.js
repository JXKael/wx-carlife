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
    content: [],
    time: "",
    location: "",
    equip: "",
    hasWaterMark: false,
    hasAuth: false
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
  },

  /**
   * 添加视频元素
   */
  insertVideo: function (ctype) {
    var newContent = this.data.content;
    var newElementNum = this.data.elementNum
    newContent.push({
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
   * 段落控件长按事件函数
   */
  onLongTapPatagraph: function (e) {
    console.log("onLongTapPatagraph")
    console.log(e)
    var that = this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: "提示",
      content: "确认删除此模块",
      success: function (res) {
        if (res.confirm){
          // 删除此模块
          var newContent = that.data.content
          var newElementNum = that.data.elementNum - 1
          newContent.splice(index, 1);
          for (var i = index; i < newElementNum; i++){
            newContent[i].index--
          }
          that.setData({
            content: newContent,
            elementNum: newElementNum
          })
        }
      }
    })
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
   * 点击提交
   */
  onTapBtnCommit: function (e) {
    console.log("提交")
  }
})
