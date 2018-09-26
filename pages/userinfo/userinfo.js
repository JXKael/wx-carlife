//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dates:'aaa',
    typeArray: ['汪星人', '喵星人', '其他物种'],
  },
  onLoad: function () {
    var that = this;
    that.setData({
      items: [
        { name: '1', value: '汽车' },
        { name: '2', value: '摩托车' },
        { name: '3', value: '改装' },
        { name: '4', value: '旅游', checked:'true'},
        { name: '5', value: '音乐' },
        { name: '6', value: '文学' },
        { name: '7', value: '时尚' },
        { name: '8', value: '美食' },
        { name: '9', value: '科技' },
        { name: '10', value: '文化' },
        { name: '11', value: '饮食' },
        { name: '12', value: '健身' },
      ]
    })
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})
