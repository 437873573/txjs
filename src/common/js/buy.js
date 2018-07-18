export const buy = {
  data() {
    return {
      head: '提示',
      text: '确定',
    }
  },
  methods: {
    buy(id) {
      this.$http.get('/third/wechat/prepare', {
        params: {
          id: id,
          type: 'ORDER'
        }
      }).then(r => {
        if (r.status = 'success') {
          let json = JSON.parse(r.data.data);
          this.pay(json)
        }
      })
    },
    pay(json) {
      let that = this;
      function onBridgeReady() {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', json,
          function (data) {
            if (data.err_msg == "get_brand_wcpay_request:ok") {
              that.$router.replace({path:'/user/bill',query:{i:1}})
            } else {
              that.$router.replace({path:'/user/bill',query:{i:0}})
            }
          }
        );
      }

      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    }
  }
};
