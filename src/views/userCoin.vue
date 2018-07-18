<template>
  <div class="user-coin">
    <div class="header">
      <h2>{{user.coin}}</h2>
      <span><div class="img"><img src="../common/img/beer.png" alt=""></div>借书豆</span>
    </div>
    <h5>交易记录</h5>
    <Scroll class="bill-content" :data="logs">
      <ul class="bill-list">
        <li class="item" v-for="v in logs" :key="v.id">
          <div class="left">
            <h3 v-html="v.description"></h3>
            <h4 v-html="v.time"></h4>
          </div>
          <div class="right">
            <h3 v-if="v.amount>0">+{{v.amount}}豆</h3>
            <h3 v-if="v.amount<0" :class="{not:v.amount<0}">{{v.amount}}豆</h3>
          </div>
        </li>
      </ul>
    </Scroll>
    <div class="foot" @click="show">充值</div>
    <Confirm ref="confirm" :confirmBtnText="confirmBtnText" :head="head" @confirm="toOrder">
      <ul class="menu">
        <li v-for="v in menu" :class="{selected:index===v.num}" @click="index=v.num">
          <h4>{{v.num}}</h4>
          <span>￥{{v.money_total}}</span>
        </li>
      </ul>
    </Confirm>
    <Confirm ref="confirm2" :head="head1" :confirmBtnText="Text" :canShow="false">
      <div id="text"><p v-if="message"></p></div>
    </Confirm>
  </div>
</template>

<script>
  import Scroll from 'base/scroll'
  import {mapGetters} from 'vuex'

  export default {
    name: "user-coin",
    components: {Scroll},
    computed: {
      ...mapGetters(['user'])
    },
    data() {
      return {
        head1: '提示',
        Text:'确定',
        message: '',
        head: '选择充值金额',
        confirmBtnText: '立即充值',
        logs: [],
        index: '',
        menu: [],
      }
    },
    methods: {
      show() {
        this.$refs.confirm.show()
      },
      getLog() {
        this.$http.get('/coin/log').then(r => {
          if (r.status == 'success') {
            this.logs = r.data.coinLog.data
          }
        })
      },
      getPackage() {
        this.$http.get('/coin/package').then(r => {
          if (r.status == 'success') {
            this.menu = r.data.package
          }
        })
      },
      toOrder() {
        this.$http.post('/recharge-store', {
          num: this.index,
          type: 'JSD'
        }).then(r => {
          if (r.status == 'success') {
            this.$http.get('/third/wechat/prepare', {
              params: {
                id: r.data.order.id,
                type: 'RECHARGE'
              }
            }).then(r => {
              if (r.status = 'success') {
                let json = JSON.parse(r.data.data)
                this.pay(json)
              }
            })
          }
        })
      },
      pay(json) {
        let that=this
        function onBridgeReady() {
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', json,
            function (data) {
              if (data.err_msg == "get_brand_wcpay_request:ok") {
                that.$http.get('/profile').then(r => {
                  if (r.status == 'success') {
                    that.$store.commit('SET_USER', r.data.user)
                    that.getLog()
                  }
                })
              } else if (data.err_msg == "get_brand_wcpay_request:fail") {
                that.message = '支付失败';
                that.$refs.confirm2.show()
              } else if (data.err_msg == "get_brand_wcpay_request:cancel") {
                that.message = '支付取消';
                that.$refs.confirm2.show()
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
    },
    activated() {
      this.$http.get('/profile').then(r=>{
        this.$store.commit('SET_USER',r.data.user)
      });
      this.getLog();
      this.getPackage();
    }
  }
</script>

<style scoped lang="scss">
  @import "common/scss/const.scss";
  @import "common/scss/mymixin.scss";

  .user-coin {
    @extend %cover;
    z-index: 4;
    .header {
      margin: 30px 24px 50px;
      height: 322px;
      background: url("../common/img/user-coin.png") no-repeat center/cover;
      @extend %center;
      flex-direction: column;
      color: $color-text-ll;
      font-size: $font-size-medium-x;
      h2 {
        font-size: 96px;
      }
      span .img{
        display: inline-block;
        width: 29px;
        height: 28px;
        margin-right: 12px;
      }
    }
    h5 {
      padding: 0 0 20px 24px;
      font-size: $font-size-medium;
      text-align: left;
    }
    .bill-content {
      position: absolute;
      top: 450px;
      bottom: 98px;
      width: 100%;
      overflow: hidden;
    }
    .item {
      height: 120px;
      border-bottom: 1px solid $color-border;
      border-image: svg(b-border) 1 ;
      padding: 0 24px;
      box-sizing: border-box;
      @extend %between;
      align-items: stretch;
      background: #FFF;
      &:last-of-type {
        border-bottom: none;
        border-image: none;
      }
      .left {
        @extend %center;
        align-items: flex-start;
        flex-direction: column;
        line-height: 1.5;
        h4 {
          font-size: $font-size-medium;
          color: $color-text-l;
        }
      }
      .right {
        line-height: 120px;
        color: $color-theme;
        .not {
          color: red;
        }
      }
    }
    .foot {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 98px;
      background: $color-theme;
      font-size: $font-size-large-x;
      color: #fff;
      line-height: 98px;
    }
    .menu {
      @extend %between;
      flex-wrap: wrap;
      margin: 10px 100px;
      li {
        width: 160px;
        height: 88px;
        border-radius: 10px;
        @extend %center;
        flex-direction: column;
        border: 1px solid $color-border;
        margin-bottom: 20px;
        h4 {
          font-size: $font-size-medium;
          color: $color-theme;
        }
        span {
          font-size: $font-size-small-x;
          color: $color-text-l;
        }
        &.selected {
          background: $color-theme;
          border-color: $color-theme;
          h4, span {
            color: #fff;
          }
        }
      }
    }
  }
</style>
