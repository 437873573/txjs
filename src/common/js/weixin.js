import $ from 'jquery'
const weixin = {
  config: {
    url:'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+window.appId+'&redirect_uri='+encodeURIComponent(window.location.href)+'&response_type=code&scope=snsapi_userinfo#wechat_redirect',
    userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
    api:window.apiHost,
  },
  isweixin: function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
    } else {
      return false;
    }
  },
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
  },
  getUser : function(code) {
    $.ajax({
      type: 'get',
      url: weixin.config.api + '/third/wechat/access-token?code='+code,
      cache:false,
      async: false,
      // dataType: 'jsonp',
      // jsonp: 'jsonpcallback',
      success: function(json){
        localStorage.setItem('MY_USER_INFO',JSON.stringify(json));
      },
      error: function(json) {
        console.log(json);
      }
    })
  },
  getUserInfo:function(){
    if(weixin.config.userInfo != null){
      return JSON.parse(localStorage.getItem('MY_USER_INFO'));
    }else{
      if(weixin.getQueryString('code') != null){
        weixin.getUser(weixin.getQueryString('code'));
        return JSON.parse(localStorage.getItem('MY_USER_INFO'));
      }else{
        window.location.href = weixin.config.url;
      }
    }
  }
}
export {weixin}
