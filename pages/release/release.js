// pages/release/release.js

//获取应用实例
const app = getApp();
Page({
  data: {
    content: [],
    typeArray: ['汪星人', '喵星人', '其他物种']
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
  insert: function (e) {
    var cb = this.data.content;
    cb.push({ type: e.currentTarget.dataset.id });
    this.setData({
      content: cb,
    });
  },
  checkboxChange: function (e) {
    console.log(e)
  }
})
