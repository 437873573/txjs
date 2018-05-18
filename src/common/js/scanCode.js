import wx from 'weixin-js-sdk'

let url = location.href.split('#')[0];
export const scan = {
  methods: {
    scan() {
      this.$http.get('/third/jssdk/get-sign-package', {
        params: {
          url: url,
          APIs: ['checkJsApi', 'scanQRCode']
        }
      }).then(r => {
        wx.config(r.data.info)
      });
      wx.error(function (res) {
        alert("出错了：" + res.errMsg);
      });
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['scanQRCode'],
          success: function (res) {
          }
        });
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["barCode"],
          success: function (res) {
            let result = res.resultStr.split(',')[1];
            window.location.href=url+'#/newBook?isbn='+result
          }
        });
      });
    }
  }
}

