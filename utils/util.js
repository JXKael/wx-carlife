/**
 * 判断目标是否是函数
 * @param {mixed} val
 * @returns {boolean}
 */
function isFunction(val) {
  return typeof val === 'function';
}
/**
 * 提示框
 */
function showModal(title, content, success) {
  wx.showModal({
    title: title,
    content: content,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        success();
      } else if (res.cancel) {
        // fail();
        console.log('用户点击取消')
      }
    }
  })
}
/**
 * 时间戳转换 几年前、几月前、几天前
 */
function getDateDiff(dateTimeStamp) {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp*1000;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    // if (monthC <= 12)
      result = "" + parseInt(monthC) + "月前";
    // else {
    //   result = "" + parseInt(monthC / 12) + "年前";
    // }
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }

  return result;
};

module.exports = {
  isFunction: isFunction,
  showModal: showModal,
  getDateDiff: getDateDiff
}
