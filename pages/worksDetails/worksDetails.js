// pages/workDetails/workDetails.js

//获取应用实例
var util = require('../../utils/util');
var request = require('../../utils/request.js');
const app = getApp();

Page({
  data: {
    title: "",
    menuName: "",
    createTime: "",
    content: "",
    praiseCount: 0,
    template: 0,
  },
  onLoad: function (option) {
    // console.log(option)
    var that = this;
    request.requestData('post/show/' + option.postid, "GET", {},
      function (res) {
        console.log(res.data)
        var post = res.data.post
        if (post.template == 1) {
          for (var i = 0; i < post.content.length; ++i) {
            if (post.content[i].image != null) {
              post.content[i].image = "http://netcarlife.com/photograph/fill/1000,750/"
                + post.content[i].image.substring(0, 2)
                + "/"
                + post.content[i].image.substring(2, 4)
                + "/"
                + post.content[i].image
            }
          }
        }else if (post.template == 2) {
          post.content = post.content.replace(/\<img/g, "<img style='width:100%'")
        }
        that.setData({
          title: post.title,
          menuName: post.menuName,
          createTime: new Date(post.createTime * 1000).toLocaleString('chinese', { hour12: false }),
          content: post.content,
          praiseCount: post.praiseCount,
          template: post.template,
          thumb: "http://netcarlife.com/photograph/fill/1000,750/" + post.thumb
        })
      }, null, null
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      imageUrl: this.data.thumb
    }
  },
})
