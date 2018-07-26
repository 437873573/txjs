import wx from 'weixin-js-sdk'

let url = location.href.split('#')[0];
window.links = '';
export const share = {
  methods: {
    share(xx) {
      let content = xx ? xx : {};
      let title = content.title ? content.title : '同学借书';
      let desc = content.desc ? content.desc : '同学借书微信平台提供个人图书共享，班级书籍共享，学校图书馆远程借阅管理，个人书架管理等自助的管理平台';
      let link = content.link ? content.link : links;
      let img = content.img ? content.img : '/logo.jpg';
      this.$http.get('/third/jssdk/get-sign-package', {
        params: {
          url: url,
          APIs: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        }
      }).then(r => {
        wx.config(r.data.info)
      });
      wx.error(function (res) {
        alert("出错了：" + res.errMsg);
      });
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
          success: function (res) {

          }
        });
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          desc: desc, // 分享描述
          imgUrl: img, // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
          },
        });
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: img, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        });
        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: img, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareWeibo({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: img, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareQZone({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: img, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    }
  }
}
