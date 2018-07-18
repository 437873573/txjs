import $ from 'jquery'

let userId = getSearchString('user_id');

function getSearchString(key) {
  // 获取URL中?之后的字符
  var str = location.search;
  str = str.substring(1, str.length);

  // 以&分隔字符串，获得类似name=123这样的元素数组
  var arr = str.split("&");
  var obj = new Object();

  // 将每一个数组元素以=分隔并赋给obj对象
  for (var i = 0; i < arr.length; i++) {
    var tmp_arr = arr[i].split("=");
    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
  }
  return obj[key];
}

const weixin = {
  config: {
    url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + window.appId + '&redirect_uri=' + encodeURIComponent(window.location.origin) + '&response_type=code&scope=snsapi_userinfo#wechat_redirect',
    userInfo: JSON.parse(localStorage.getItem('MY_USER_INFO')),
    api: window.apiHost,
  },
  isweixin: function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  getQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  getUser: function (code,state) {
    $.ajax({
      type: 'get',
      url: weixin.config.api + '/third/wechat/access-token?code=' + code + '&state='+state+'&user_id=' + userId,
      cache: false,
      async: false,
      // dataType: 'jsonp',
      // jsonp: 'jsonpcallback',
      success: function (json) {
        localStorage.setItem('MY_USER_INFO', JSON.stringify(json));
      },
      error: function (json) {
        console.log(json);
      }
    })
  },
  getUserInfo: function () {
    if (weixin.config.userInfo != null) {
      return JSON.parse(localStorage.getItem('MY_USER_INFO'));
    } else {
      if (weixin.getQueryString('code') != null) {
        weixin.getUser(weixin.getQueryString('code'),weixin.getQueryString('state'));
        return JSON.parse(localStorage.getItem('MY_USER_INFO'));
      } else {
        window.location.href = weixin.config.url;
      }
    }
  }
}
export {weixin}
