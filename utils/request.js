var util = require( 'util.js' );
// var app = getApp();

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
function requestData(url, method, data, successCallback, errorCallback, completeCallback) {
    wx.request( {
      url:"https://netcarlife.com/api/"+ url,
        data: data,
        method: method,
        header: { 'content-type': 'application/x-www-form-urlencoded'},
        success: function( res ) {
            if (res.data.error == 0 )
              util.isFunction(successCallback) && successCallback(res);
            else
              util.isFunction(errorCallback) && errorCallback(res);
        },
        error: function() {
            util.isFunction( errorCallback ) && errorCallback();
        },
        complete: function() {
            util.isFunction( completeCallback ) && completeCallback();
        }
    });
}
//登录创建
function loginF(this_, completeCallback,getType){
  // 登录
  wx.login({
    success: result => { 
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      var code = result.code;
      wx.getUserInfo({
        success: res => {
          if (getType !=1 ){
            this_.globalData.userInfo = res.userInfo;
          }else{
            this_.globalData.userInfo = res.rawData;
          }
          wx.request({
            url: "https://beehive-api.sodudu.cn/member/create",
            data: { code: code },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (resu) {
              if (resu.data.code == 10000) {
                wx.clearStorageSync();
                this_.globalData.token = resu.data.data.token;
                wx.setStorageSync('token', resu.data.data.token);
                util.isFunction(completeCallback) && completeCallback(this_.globalData.userInfo);
                supplement(resu.data.data.member_id, res.userInfo.nickName, res.userInfo.avatarUrl);
              }
              if (this_.globalData.loadurl != "") {
              wx.reLaunch({
                url: this_.globalData.loadurl
              })
                }
              }
          })
        },
        fail:res=>{
          
        }
      })
    }
  })
}
//判断是否登录
function isLogin(this_){
  // var mtoken = wx.getStorageSync('token');
  wx.checkSession({
    success:function(){
      if (this_.globalData.userInfo && this_.globalData.userInfo.nickName!=""){
        wx.authorize({
          scope: 'scope.userInfo',
          success:function(){
            loginF(this_, null);
          },
          fail:function(){

          }
        })
      } 
    },
    fail:function(){
      // getToken(this_,null);
      wx.clearStorageSync();
      loginF(this_,null);
    }
  })
}
//获取登录token
function getToken(this_, completeCallback){
  wx.login({
    success: result => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      var code = result.code;
      wx.request({
        url: "https://beehive-api.sodudu.cn/member/create",
        data: { code: code },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (resu) {
          if (resu.data.code == 10000) {
            this_.globalData.token = resu.data.data.token;
            wx.clearStorageSync();
            wx.setStorageSync('token', resu.data.data.token);
            util.isFunction(completeCallback) && completeCallback(resu.data.data.token);
          }
        }
      })
    }
  })
}
//完善用户信息
function supplement(member_id, wx_nickname, wx_avatar){
  var data = {
    member_id: member_id,
    wx_nickname: wx_nickname,
    wx_avatar: wx_avatar
  };
  wx.request({
    url: "https://beehive-api.sodudu.cn/member/supplement",
    method: "POST",
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (resdd) {
    }
  })
}
module.exports = {
  requestData: requestData,
  isLogin: isLogin,
  loginF: loginF,
  getToken: getToken
};