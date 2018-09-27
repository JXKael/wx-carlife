// pages/workDetails/workDetails.js

//获取应用实例
var util = require('../../utils/util');
var request = require('../../utils/request.js');
const app = getApp();

Page({
  data: {
   
  },
  onLoad: function (option) {
    console.log(option)
    var that = this;
    request.requestData('post/show/' + option.postid, "GET", {}, function (data) {
      
    }, null, null)
  }
})
