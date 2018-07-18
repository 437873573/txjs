import wx from 'weixin-js-sdk'

let url = location.href.split('#')[0];
export const getLocation = {
  data(){
    return{
      center:[],
      lists:[]
    }
  },
  methods: {
    getLocation() {
      let that=this;
      this.$http.get('/third/jssdk/get-sign-package', {
        params: {
          url: url,
          APIs: ['checkJsApi', 'getLocation']
        }
      }).then(r => {
        wx.config(r.data.info)
      });
      wx.error(function (res) {
        alert("出错了：" + res.errMsg);
      });
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['getLocation'],
          success: function (res) {
          }
        });
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            // alert([res.longitude, res.latitude])
            that.center=[res.longitude, res.latitude];
            that.$http.get('/mechanism',
              {params:
                  {
                    distance:5000,
                    latitude:res.latitude,
                    longitude:res.longitude
                  }
              }).then(r=>{
                  if(r.status=='success'){
                    that.lists = [];
                    r.data.mechanisms.forEach((v) => {
                      let marker = {};
                      marker.position = [v.longitude, v.latitude];
                      marker.events = {
                        click() {
                          that.showMess(v)
                        }
                      };
                      that.lists.push(marker)
                    });
                  }
            })
          }
        });
      });
    }
  },
  created(){
    this.getLocation();
  },
};
