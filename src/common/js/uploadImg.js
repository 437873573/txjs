import wx from 'weixin-js-sdk'

let url = location.href.split('#')[0];
var ua = window.navigator.userAgent;
var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export const upload = {
  data(){
    return{
      photo:'',
      serverId:''
    }
  },
  methods: {
    upload() {
      let that=this
      this.$http.get('/third/jssdk/get-sign-package', {
        params: {
          url: url,
          APIs: [
            'chooseImage',
            'uploadImage',
            'getLocalImgData'
          ]
        }
      }).then(r => {
        wx.config(r.data.info)
      });
      wx.error(function (res) {
        alert("出错了：" + res.errMsg);
      });
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: [
            'chooseImage',
            'uploadImage',
            'getLocalImgData'
          ],
          success: function (res) {
            if (res.checkResult.getLocation == false) {
              alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
              return;
            }
          }
        });
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          success: function (res) {
            let localId = res.localIds[0];
            if(isiOS){
              wx.getLocalImgData({
                localId: localId,
                success: function (res) {
                  that.photo = res.localData;
                }
              });
            }else{
              that.photo=localId
            }
            wx.uploadImage({
              localId: localId,
              success: function (res) {
                that.serverId=res.serverId
              }
            })
          }
        });
      });
    },
  }
}
